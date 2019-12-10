const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//console.log("I am here");
// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ email, password, msg: "Please enter all fields." });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: "User with that email already exists" });
    }

    const newUser = new User({
      email,
      password
    });

    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;
    const savedUser = await newUser.save();

    jwt.sign(
      { id: savedUser.id },
      process.env.jwtSecret,
      { expiresIn: 36000000000000000 },
      (err, token) => {
        if (err) {
          throw err;
        }

        res.json({
          token,
          user: {
            id: savedUser.id,
            email: savedUser.email
          }
        });
      }
    );
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
});

module.exports = router;
