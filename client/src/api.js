// All calls to the backend live here, so the components stay simple.

async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export function getNotes() {
  return request("/api/notes");
}

export function addNote(title, content) {
  return request("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
}

export function deleteNote(id) {
  return request(`/api/notes/${id}`, { method: "DELETE" });
}

export function askAboutNote(noteId, question) {
  return request("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ noteId, question }),
  });
}
