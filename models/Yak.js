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

  author: String,

  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

  image: String,

  upvotes: { type: Number, default: 0 },

  geometry: GeoSchema,

  createdAt: { type: Date, expires: 86400, default: Date.now }
});

// Deletes the geometry field from returned JSON before serving
YakSchema.methods.toJSON = function() {
  const yak = this.toObject();
  delete yak.geometry;
  return yak;
};

YakSchema.index({ geometry: "2dsphere" });

module.exports = Yak = mongoose.model("Yak", YakSchema);
