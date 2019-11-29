const express = require("express");
const router = express.Router();

// Sends MapBox api key to front end
router.get("/", (req, res) => {
  if (process.env.mapBox) {
    res.json({ key: process.env.mapBox });
  } else {
    res.json("No mapBox api key provided");
  }
});

module.exports = router;
