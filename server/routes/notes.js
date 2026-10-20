// Basic CRUD for notes: Create, Read, Delete.

const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET /api/notes -> all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Could not load notes" });
  }
});

// POST /api/notes -> save a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Could not save the note" });
  }
});

// DELETE /api/notes/:id -> remove a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Could not delete the note" });
  }
});

module.exports = router;
