// This is the AI part.
// The browser sends a note id and a question. We look up the note in MongoDB,
// send both to an LLM through the OpenRouter API, and return the answer.
//
// The API key stays here on the server, so it is never exposed in the browser.

const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.post("/", async (req, res) => {
  const { noteId, question } = req.body;

  if (!noteId) {
    return res.status(400).json({ error: "noteId is required" });
  }

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // If the user left the question empty, we ask for a summary instead
    const userQuestion = question && question.trim()
      ? question
      : "Summarize this note in 5 short bullet points.";

    // The "system" message tells the AI how to behave.
    // Telling it to stick to the note keeps the answers on topic.
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful study assistant. Answer using only the note provided. " +
          "If the answer is not in the note, say so. Keep answers short and simple.",
      },
      {
        role: "user",
        content: `Note title: ${note.title}\n\nNote:\n${note.content}\n\nQuestion: ${userQuestion}`,
      },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(502).json({ error: "The AI service returned an error" });
    }

    // The reply text lives here in the response
    const answer = data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while asking the AI" });
  }
});

module.exports = router;
