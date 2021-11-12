const db = require("../models");
const Post = db.post;
const User = db.user;
const Like = db.like;
const Comment = db.comment;

exports.like = (req, res) => {
    const postId = req.params.postId;
    const userId = recupUserId.recupUserIdWithToken(req);
    //Recherche de l'existence de la publication
    Post.findOne({ where: { id: postId } })
      .then((post) => {
        //Si il n'existe pas => renvoi d'un message d'erreur
        if (!post) {
          res.status(400).send({ message: "Publication Introuvable" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .send({
            error,
            message: "Erreur lors de la recherche de la publication id=" + postId,
          });
      });


      //Recherche de l'existence de l'utilisateur
      User.findOne({ where: { id: userId } })
      .then((user) => {
        //Si il n'existe pas => renvoi d'un message d'erreur
        if (!user) {
          res.status(400).send({ message: "Utilisateur Introuvable" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .send({
            error,
            message: "Erreur lors de la recherche de l'utilisateur id=" + userId,
          });
      });

      //si la publication et l'utilisateur existe => recherche si un like existe
    Like.findOne({
      where: { userId: req.body.userId, postId: req.params.postId },
    })
      .then((like) => {
        if (like) {
          Like.destroy({
            where: { userId: req.body.userId, postId: req.params.postId },
          })
            .then(
              res
                .status(200)
                .send({ message: "Vous n'aimez plus cette publication" })
            )
            .catch((error) =>
              res
                .status(400)
                .send({ error, message: "Erreur lors de la destruction du like" })
            );
        } else {
          Like.create({
            userId: req.body.userId,
            postId: req.params.postId,
          })
            .then(
              res.status(200).send({ message: "Vous aimez cette publication" })
            )
            .catch((error) =>
              res
                .status(400)
                .send({ error, message: "Erreur lors du like de la publication" })
            );
        }
      })
      .catch((error) =>
        res
          .status(400)
          .send({ error, message: "Erreur lors de la recherche du like" })
      );
  };