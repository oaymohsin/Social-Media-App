const postModel = require("../Models/postModel");


exports.uploadPost=(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new postModel({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
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

  exports.getPosts=(req, res, next) => {
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
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred while fetching posts",
          error: error.message || error,
        });
      });
  }

  exports.getPost=(req, res, next) => {
    postModel.findOne({ _id: req.params.id }).then((post) => {
      res.status(200).json({
        message: "post fetched",
        posts: post,
      });
    });
  }

  exports.deletePost= (req, res, next) => {
    postModel.deleteOne({ _id: req.params.id,creator:req.userData.userId }).then((result) => {
      // console.log(result)
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deleted successfully!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    });
  }

  exports.updatePost=(req, res, next) => {
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
      creator: req.userData.userId,
    });
    // console.log(post);
    postModel
      .updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        // console.log(result)
        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      });
  }