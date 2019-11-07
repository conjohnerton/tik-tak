const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// The model for a location that maps on the surface of the Earth.
const GeoSchema = new Schema({
   type: {
      type: String,
      default: "Point"
   },
   coordinates: {
      type: [Number],
      index: "2dsphere"
   }
});

// The model that represents every post, ever.
const YakSchema = new Schema({
   content: { type: String, required: true },
   author: { type: Schema.Types.ObjectId, ref: "User" },

   // TODO: This should be used in sprint2
   // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

   // TODO: CREATE IMAGE FIELD

   geometry: GeoSchema,

   // This may need a different expiration time for testing purpose
   createdAt: { type: Date, expires: 3600, default: Date.now }, // one of these
   expire_at: { type: Date, default: Date.now, expires: 3600 } // should work
});

module.exports = Yak = mongoose.model("Yak", YakSchema);
