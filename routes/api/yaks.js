const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const s3uploads = require("../../middleware/s3uploads");

// Imported Schemas
const Yak = require("../../models/Yak");
const User = require("../../models/User");

// Gets yaks within a 5 mile radius of input location
router.get("/", auth, async (req, res) => {
  try {
    // this is not crashing but Idk if it actually gets anything useful
    // Get yaks around given location, measured along the surface of Earth
    const localYakList = await Yak.where("geometry")
      .near({
        center: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 30000.58, // 18-19ish miles
        spherical: true
      })
      .populate("comments");

    // Respond with found yaks
    res.status(200).json({ success: true, yaks: localYakList });
  } catch (exception) {
    console.log(exception);
    res.status(400).json({ success: false, exception });
  }
});

// Posts a yak to logged-in user, broadcasts to others for
router.post("/", auth, s3uploads, async (req, res) => {
  try {
    // Get User the logged in from DB
    const user = await User.findById(req.user.id);

    // Creates and saves new Yak from input data
    const newYak = new Yak({
      content: req.body.content,
      author: user.email,
      comments: [],
      image: req.file ? req.file.location : "No image url",
      geometry: {
        type: "Point",
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    });

    await newYak.save();

    // Add yak to User object
    user.posts.push(newYak);

    // Save modified User object to DB
    await user.save();

    // Respond with success
    res.status(200).json({ success: true, newYak });
  } catch (exception) {
    console.log(exception);
    res.status(400).json({ success: false, exception });
  }
});

// Deletes yak from given ID, only if user owns it.
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Checks if user owns yak
    if (!user.posts.includes(req.params.id)) {
      return res
        .status(403)
        .json({ success: false, msg: "You don't own that post." });
    }

    // Deletes yak
    await Yak.findByIdAndDelete(req.params.id);

    // Filters yak from user and saves to db
    user.posts = user.posts.filter((yak) => yak.id != req.params.id);
    await user.save();

    res.status(200).json({ success: true });
  } catch (exception) {
    console.log(exception);
    res.status(400).json({ success: false, exception });
  }
});

// ? Possible to rewrite and pass the current upvotes from front-end, reducing queries
// Gets yak and increments its upvote count by one
router.post("/:id/upvote", async (req, res) => {
  try {
    const yak = await Yak.findById(req.params.id);

    // Update the yaks upvote count (returns the db update logs)
    await yak.updateOne({ upvotes: yak.upvotes + 1 });

    res.json({ success: true });
  } catch (err) {
    console.log(err, "Could not upvote post.");
    res.status(400).json({ success: false, msg: "Could not upvote post." });
  }
});

module.exports = router;
