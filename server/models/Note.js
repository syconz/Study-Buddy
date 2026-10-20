// A "model" describes what one document in MongoDB looks like.
// Here, a note has a title and the text the student pasted in.

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // Mongoose adds createdAt and updatedAt for us
);

module.exports = mongoose.model("Note", noteSchema);
