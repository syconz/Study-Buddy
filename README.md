# Study Buddy

A small MERN app. You save study notes, pick one, and ask an AI questions about it
(or click Summarize). Notes are stored in MongoDB. The AI call happens on the server
through the OpenRouter API.

**Stack:** MongoDB, Express, React (Vite), Node.js

## Run it locally

You need Node 18+ and MongoDB (local install or a free MongoDB Atlas cluster).

1. Backend
   ```
   cd server
   npm install
   cp .env.example .env     # then open .env and add your OpenRouter key
   npm run dev
   ```
2. Frontend (in a second terminal)
   ```
   cd client
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

## How it works

1. React sends the note to `POST /api/notes`. Express saves it in MongoDB with Mongoose.
2. When you ask a question, React calls `POST /api/ask` with the note id and the question.
3. The server loads that note from MongoDB, sends the note and question to the LLM,
   and returns the answer.
4. React shows the answer.

The API key is only in the server's `.env`, so the browser never sees it.

## Folder guide

- `server/index.js` starts Express and connects to MongoDB
- `server/models/Note.js` shape of a note in the database
- `server/routes/notes.js` save, list and delete notes
- `server/routes/ask.js` the AI call
- `client/src/App.jsx` main component and state
- `client/src/components/` form, list, and ask panel
- `client/src/api.js` all fetch calls in one place
