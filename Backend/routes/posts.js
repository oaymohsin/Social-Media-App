const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const Multer= require("../middlewares/multer")

const postController=require("../controllers/postController");

const app = express();


router.post(
  "",
  checkAuth,
  Multer,
  postController.uploadPost
);

// router.post("", (req, res, next) => {
//     const posts = new postModel({
//       title: req.body.title,
//       content: req.body.content,
//     });
//     posts.save().then((savedPost) => {
//       const postId = savedPost._id;
//       res.status(201).json({
//         message: "Post added Successfully",
//         postId: postId,
//       });
//     });
//     // console.log(posts);
//   });

router.get("",postController.getPosts );

router.get("/:id",postController.getPost );

router.delete("/:id",checkAuth,postController.deletePost );

router.put(
  "/:id",
  checkAuth,
  Multer,
  postController.updatePost
);

module.exports = router;
