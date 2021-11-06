const db = require("../config/db.config.js");
const Post = db.post;

exports.create = (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  })
    .then((post) => {
      res.status(200).send({
        post,
        message: "post created successfully",
      });
    })
    .catch((error) => res.status(500).send({ error }));
};

exports.getAll = (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) => res.status(400).send({ error }));
};

exports.getOne = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => {
      if (post == null) {
        return res.status(401).send({ error: "Post introuvable" });
      }
      res.status(200).send({ post });
    })
    .catch((error) => res.status(401).send({ error }));
};

exports.update = (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    { where: { id: req.params.postId } }
  )
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Post updated successfully with id = " + req.params.postId,
      });
    })
    .catch((error) =>
      res.status(500).send({
        message:
          "erreur lors de la mise à jour du post id=" + req.params.postId,
        error,
      })
    );
};

exports.delete = (req, res) => {
  Post.destroy({ where: { id: req.params.postId } })
    .then(() => {
      res.status(200).send({
        status: true,
        message: "Post deleted successfully with id = " + req.params.postId,
      });
    })
    .catch((error) =>
      res.status(500).send({
        message:
          "erreur lors de la suppression du post id=" + req.params.postId,
        error,
      })
    );
};

exports.like = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })

    .then((post) => {
      if (req.body.like === 1) {
        if (
          !post.usersLiked.includes(req.body.userId) &&
          !post.usersDisliked.includes(req.body.userId)
        ) {
          const newNumberOfLike = JSON.parse(post.likes) + 1;
          const usersLikedList = JSON.parse(post.usersLiked);
          usersLikedList.push(req.body.userId);
          Post.update(
            {
              likes: newNumberOfLike,
              usersLiked: usersLikedList,
            },
            { where: { id: req.params.postId } }
          )
            .then(() => {
              res.status(200).send({
                message:
                  "Le post id=" +
                  req.params.postId +
                  " a été liké par l'utilisateur id=" +
                  req.body.userId,
              });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      } else if (req.body.like === -1) {
        if (
          !post.usersLiked.includes(req.body.userId) &&
          !post.usersDisliked.includes(req.body.userId)
        ) {
          const newNumberOfDislike = JSON.parse(post.dislikes) + 1;
          const usersDislikedList = JSON.parse(post.usersDisliked);
          usersDislikedList.push(req.body.userId);

          Post.update(
            {
              dislikes: newNumberOfDislike,
              usersDisliked: usersDislikedList,
            },
            { where: { id: req.params.postId } }
          )
            .then(() => {
              res.status(200).send({
                message:
                  "Le post id=" +
                  req.params.postId +
                  " a été disliké par l'utilisateur id=" +
                  req.body.userId,
              });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      } else if (req.body.like === 0) {
        if (post.usersLiked.includes(req.body.userId)) {
          const newNumberOfLike = JSON.parse(post.likes) - 1;
          const usersLikedList = JSON.parse(post.usersLiked);
          const userIndex = usersLikedList.indexOf(req.body.userId);
          usersLikedList.splice(userIndex, 1);
          Post.update(
            {
              likes: newNumberOfLike,
              usersLiked: usersLikedList,
            },
            { where: { id: req.params.postId } }
          )
            .then(() => {
              res.status(200).send({
                message:
                  "Le like de l'utilisateur id=" +
                  req.body.userId +
                  " a été supprimé du post id=" +
                  req.params.postId,
              });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(req.body.userId)) {
            const newNumberOfDislike = JSON.parse(post.dislikes) - 1;
            const usersDislikedList = JSON.parse(post.usersDisliked);
            const userIndex = usersDislikedList.indexOf(req.body.userId);
            usersDislikedList.splice(userIndex, 1);
            Post.update(
              {
                dislikes: newNumberOfDislike,
                usersDisliked: usersDislikedList,
              },
              { where: { id: req.params.postId } }
            )
              .then(() => {
                res.status(200).send({
                  message:
                    "Le dislike de l'utilisateur id=" +
                    req.body.userId +
                    " a été supprimé du post id=" +
                    req.params.postId,
                });
              })
              .catch((error) => res.status(400).json({ error }));

        }
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getLatest = (req, res) => {
  Post.findAll()
    .then((posts) => {
      postsLatest = [];
      for (
        let i = posts.length - req.body.numberOfPosts;
        i < posts.length;
        i++
      ) {
        postsLatest.push(posts[i]);
      }

      res.status(200).send(postsLatest);
    })
    .catch((error) => res.status(400).send({ error }));
};
