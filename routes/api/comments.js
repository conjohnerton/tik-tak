// Note: Should we add preventative measures for posting empty comments?
// ^^^^ Taken care of on front end... RIght now.
// Also, the author isn't returned in the comment JSON... hmmmmmm
// No need for that ^^^^ because we add it on the front end itself

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Comment = require("../../models/Comment");
const User = require("../../models/User");

// @route   GET api/Comment
// @desc		Get all Comments from user
// @access  Public
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .populate("comments")
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//router.get("/search/:id", auth, (req, res) => {});

router.post("/", auth, async (req, res) => {
  // Get user to use its email... So mean.
  const user = await User.findById(req.user.id);

  const newComment = new Comment({
    content: req.body.content,
    author: user.email
  });

  try {
    // Verify and get user, then save all details of new comment to user
    const user = await User.findById(req.user.id);

    // Get yak from db
    const yak = await Yak.findById(req.body.yakId);

    // Save comment to the db
    const comment = await newComment.save();

    // push comment to User and Yak
    user.comments.push(comment.id);

    // console.log();
    yak.comments.push(comment.id);

    // Save updated user and yak to db
    await user.save();
    await yak.save();

    res.json({ comment: comment, success: true });
  } catch (exception) {
    console.log(exception);
    res.json({ exception, success: false });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await Comment.deleteOne({ _id: req.params.id });

    // filter out deleted contact
    user.comments = user.comments.filter(
      (comment) => comment.id != req.params.id
    );

    await user.save();
    res.json({ success: true });
  } catch (exception) {
    res.json({ exception, success: false });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    const newComment = new Comment({
      content: req.body.content
      // date created and author automatically supplied
    });

    const updatedComment = await newComment.save();

    let user = await User.findById(req.user.id);

    user.comments = user.comments.filter((comment) => comment != req.params.id);

    user.comments.push(updatedComment);
    await user.save();

    user = await User.findById(req.user.id).populate("comments");
    res.json({ user, success: true });
  } catch (exception) {
    res.json({ success: false });
  }
});

module.exports = router;
