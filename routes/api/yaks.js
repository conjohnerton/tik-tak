const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

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
        maxDistance: 8046.72, // 5 miles
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
router.post("/", auth, async (req, res) => {
  try {
    // Get User the logged in from DB
    const user = await User.findById(req.user.id);

    // Creates and saves new Yak from input data
    const newYak = new Yak({
      content: req.body.content,
      author: user.email,
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

// TODO: Reject delete if user doesn't own yak
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find current user
    const user = await User.findById(req.user.id);

    // Delete yak and filter from user
    await Yak.findByIdAndDelete(req.params.id);

    user.posts = user.posts.filter((yak) => yak.id != req.params.id);

    await user.save();
    res.status(200).json({ success: true });
  } catch (exception) {
    console.log(exception);
    res.status(400).json({ success: false, exception });
  }
});

module.exports = router;
