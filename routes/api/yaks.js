const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Imported Schemas
const Comment = require("../../models/User");

//  * 5 Miles === 8046.72 Meters
router.get("/yaks", auth, async (req, res) => {
   res.json({ msg: "hello" });
});

module.exports = router;
