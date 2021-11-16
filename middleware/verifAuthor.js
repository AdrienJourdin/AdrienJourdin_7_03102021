const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const recupUserId = require("./recupUserIdWithToken");

//Middleware qui permet de vérifier si l'on peut supprimer ou modifier un post/commentaire
module.exports = async (req, res, next) => {
  const userId = recupUserId.recupUserIdWithToken(req);
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user.role == "admin") {
      next();
    } else {
      if (postId) {
        try {
          const post = await Post.findOne({ where: { id: postId } });
          if (!post) {
            res
              .status(400)
              .send({ message: "Publication id=" + postId + " introuvable " });
          }
          if (post.userId == userId) {
              console.log("userId",userId);
            next();
          } else {
            res.status(400).send({
              message: "Vous ne pouvez pas modifier cette publication",
            });
          }
        } catch {
          res.status(500).send({
            message:
              "Erreur lors de la recherche de la publication id=" +
              req.params.postId,
          });
        }
      } else if (commentId) {
        try {
          const comment = await Comment.findOne({
            where: { id: req.params.commentId },
          });
          if (!comment) {
            res
              .status(400)
              .send({ message: "Commentaire id=" + postId + " introuvable " });
          }
          if (comment.userId == userId) {
            next();
          } else {
            res
              .status(400)
              .send({ message: "Vous ne pouvez pas modifier ce commentaire" });
          }
        } catch {
          res.status(400).send({
            error,
            message:
              "Erreur lors de la recherche du commentaire id=" +
              req.params.postId,
          });
        }
      }
    }
  } catch {
    res.status(400).send({
      error,
      message:
        "Erreur lors de la recherche de l'utilisateur id=" +
        userId +
        "dans la base de données",
    });
  }
};
