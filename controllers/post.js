const Post = require("../models/post.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        link: req.body.link,
        like:0,
        dislike:0,
    });
  
    // Save Customer in the database
    Post.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      else res.send(data);
    });
  };



