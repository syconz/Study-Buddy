// Entry point of the backend.
// It sets up Express, connects to MongoDB, and wires up the two route files.

require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const notesRoutes = require("./routes/notes");
const askRoutes = require("./routes/ask");

const app = express();

app.use(cors());          // lets the React app (different port) call this server
app.use(express.json());  // lets us read JSON sent in request bodies

app.use("/api/notes", notesRoutes); // save / list / delete notes
app.use("/api/ask", askRoutes);     // ask the AI about a note
// In production, serve the built React app from this same server
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

// Only start listening once the database connection works
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err.message));
