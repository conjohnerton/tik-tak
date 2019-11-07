const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Imported Schemas
const Comment = require("../../models/User");

router.get("/yaks", auth, async (req, res) => {
   try {
      // Get yaks around given location, measured along the surface of Earth
      const localYakList = await Yak.geoNear(
         {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
         },
         { maxDistance: 8046.72, spherical: true } // 5 miles
      );

      // Return found yaks
      res.status(200).json({ success: true, yaks: localYakList });
   } catch (exception) {
      res.json(exception);
   }
});

module.exports = router;
