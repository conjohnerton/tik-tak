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
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ email, password, msg: "Please enter all fields." });
  }

  // Check for existing user
  User.findOne({ email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json({ msg: "User with that email already exists" });

      const newUser = new User({
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.jwtSecret,
              { expiresIn: 36000000000000000 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    email: user.email,
                    contacts: []
                  }
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
