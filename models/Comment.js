const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for each comment. Comments have a One-to-One relation with a User
const CommentSchema = new Schema({
  content: {
    type: String,
    required: false
  },

  dateCreated: { type: Date, expires: "86400", default: Date.now },

  author: String
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
