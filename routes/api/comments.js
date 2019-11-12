// Note: Should we add preventative measures for posting empty comments?
// Also, the author isn't returned in the comment JSON... hmmmmmm

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
   const newComment = new Comment({
      content: req.body.content,
      author: req.user.id
      // date created and author automatically supplied
   });

   try {
      // verify and get user, then save all details of new comment to user
      const user = await User.findById(req.user.id);
      const comment = await newComment.save();
      // push comment to user, save user, then return the thing
      user.comments.push(comment.id);
      const new_user = await user.save();
      res.json({ comment: comment, success: true });
   } catch (exception) {
      //console.log(exception);
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

      user.comments = user.comments.filter(
         (comment) => comment != req.params.id
      );

      user.comments.push(updatedComment);
      await user.save();

      user = await User.findById(req.user.id).populate("comments");
      res.json({ user, success: true });
   } catch (exception) {
      res.json({ success: false });
   }
});

module.exports = router;
