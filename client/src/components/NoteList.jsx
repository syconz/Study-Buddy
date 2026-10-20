// Shows every saved note. Clicking one selects it, the x button deletes it.
export default function NoteList({ notes, selectedId, onSelect, onDelete }) {
  if (notes.length === 0) {
    return <p className="empty">No notes yet. Save your first one above.</p>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li
          key={note._id}
          className={note._id === selectedId ? "note selected" : "note"}
        >
          <button className="note-title" onClick={() => onSelect(note._id)}>
            {note.title}
          </button>
          <button
            className="delete"
            aria-label={`Delete ${note.title}`}
            onClick={() => onDelete(note._id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
