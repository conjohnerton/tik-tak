const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// The model for a location that maps on the surface of the Earth.
const CommentSchema = new Schema({
   content: {
      type: String,
      required: false
   },

   dateCreated: { type: Date, default: Date.now },

   user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
