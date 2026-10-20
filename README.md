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

## Questions you may get asked

- **Why call the AI from the server and not from React?** Anything in React code is visible to the user, so an API key there could be stolen.
- **What does the proxy in vite.config.js do?** It forwards `/api` requests to Express during development, so there are no CORS issues.
- **Why tell the AI to use only the note?** It keeps answers grounded in the user's content and reduces made-up answers.
- **What would you add next?** Login with JWT so each user sees only their own notes, and saving the Q&A history.
