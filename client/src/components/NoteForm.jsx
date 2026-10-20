import { useState } from "react";

// A small form with two inputs. It keeps what the user types in state,
// and calls onAdd (given by App) when the button is clicked.
export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading
    if (!title.trim() || !content.trim()) return;
    onAdd(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New note</h2>
      <input
        type="text"
        placeholder="Title, e.g. Operating Systems: Deadlocks"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows={6}
        placeholder="Paste or type your notes here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Save note</button>
    </form>
  );
}
