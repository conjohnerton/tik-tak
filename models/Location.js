const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A location holds a name and a list of its (expiring) posts
const LocationSchema = new Schema({
   name: {
      type: String,
      unique: true,
      required: true
   },
   yaks: [{ type: Schema.Types.ObjectId, ref: "Yak" }]
});

module.export = mongoose.model("Location", LocationSchema);
