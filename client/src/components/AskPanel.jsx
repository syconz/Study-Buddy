import { useState } from "react";
import { askAboutNote } from "../api";

// Shows the selected note and lets the user ask the AI about it.
export default function AskPanel({ note }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk(q) {
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const data = await askAboutNote(note._id, q);
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // runs whether it worked or failed
    }
  }

  return (
    <div className="card">
      <h2>{note.title}</h2>
      <p className="note-body">{note.content}</p>

      <div className="ask-row">
        <input
          type="text"
          placeholder="Ask a question about this note"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk(question)}
        />
        <button onClick={() => handleAsk(question)} disabled={loading}>
          Ask
        </button>
        {/* An empty question makes the backend return a summary */}
        <button className="secondary" onClick={() => handleAsk("")} disabled={loading}>
          Summarize
        </button>
      </div>

      {loading && <p className="status">Thinking…</p>}
      {error && <p className="error">{error}</p>}
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
}
