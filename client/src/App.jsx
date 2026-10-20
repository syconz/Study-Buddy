// The main component. It keeps the list of notes and which note is selected,
// and passes them down to the smaller components.

import { useEffect, useState } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import AskPanel from "./components/AskPanel";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  // Runs once when the page loads: fetch saved notes from the backend
  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch((err) => setError(err.message));
  }, []);

  async function handleAdd(title, content) {
    try {
      const newNote = await addNote(title, content);
      setNotes([newNote, ...notes]); // put the new note at the top
      setSelectedId(newNote._id);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  const selectedNote = notes.find((n) => n._id === selectedId);

  return (
    <div className="app">
      <header>
        <h1>Study Buddy</h1>
        <p>Save your notes, then ask questions about them.</p>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="layout">
        <section className="left">
          <NoteForm onAdd={handleAdd} />
          <NoteList
            notes={notes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={handleDelete}
          />
        </section>

        <section className="right">
          {selectedNote ? (
            <AskPanel note={selectedNote} />
          ) : (
            <p className="empty">Pick a note on the left to start asking questions.</p>
          )}
        </section>
      </div>
    </div>
  );
}
