const express = require("express");
const multer = require("multer");
const path = require("path");

const postModel = require("../Models/postModel");
const router = express.Router();

const app = express();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    // cb(error, "/images");
    cb(error, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    const nameWithoutExtension = path.parse(file.originalname).name;
    const name = nameWithoutExtension.toLowerCase().split(" ").join("-");

    // console.log(nameWithoutExtension)
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new postModel({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
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

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = postModel.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return postModel.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Post fetched successfully",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occurred while fetching posts",
        error: error.message || error,
      });
    });
});


router.get("/:id", (req, res, next) => {
  postModel.findOne({ _id: req.params.id }).then((post) => {
    res.status(200).json({
      message: "post fetched",
      posts: post,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  postModel.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted",
    });
  });
});

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body.imagePath);
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new postModel({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    // console.log(post);
    postModel.updateOne({ _id: req.params.id }, post).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

module.exports = router;
