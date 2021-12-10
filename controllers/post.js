const db = require("../models");
const Post = db.post;
const User = db.user;
const Like = db.like;
const Comment = db.comment;
const recupUserId = require("../middleware/recupUserIdWithToken");

exports.create = async (req, res) => {
  const userId = recupUserId.recupUserIdWithToken(req);
  const postObject = req.body.post;
  const nom_fichier_post = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";
  //Vérification de l'existence de l'utilisateur
  User.findOne({ where: { id: userId } })
    .then((user) => {
      //Si il n'existe pas => renvoi d'un message d'erreur
      if (!user) {
        res.status(400).send({ message: "Utilisateur Introuvable" });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error,
        message: "Erreur lors de la recherche de l'utilisateur id=" + userId,
      });
    });

  //Si il existe => appel de la fonction de création
  Post.create({
    content: postObject,
    userId: userId,
    imageUrl: nom_fichier_post,
  })
    .then((post) => {
      res.status(200).send({
        post,
        message: "Votre poste a bien été créé",
      });
    })
    .catch((error) =>
      res
        .status(400)
        .send({ message: "Erreur lors de la création de votre poste", error })
    );
};

exports.getAll = (req, res) => {
  Post.findAll({
    attributes: ["id", "content", "imageUrl", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
      {
        model: Like,
        include: {
          model: User,
          attributes: ["id", "lastName", "firstName"],
        },
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName", "imageUrl"],
        },
      },
    ],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) =>
      res
        .status(400)
        .send({ error, message: "Erreur lors du chargement des publications" })
    );
};

exports.getOne = (req, res) => {
  console.log(req.params.postId, typeof req.params.postId);
  Post.findOne({
    where: { id: req.params.postId },
    include: [
      {
        model: User,
        attributes: ["id", "lastName", "firstName", "ImageUrl"],
      },
      {
        model: Like,
        include: {
          model: User,
          attributes: ["id", "lastName", "firstName"],
        },
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName", "imageUrl"],
        },
      },
    ],
  })
    .then((post) => {
      if (!post) {
        return res
          .status(401)
          .send({ error, message: "Publication introuvable" });
      } else {
        res.status(200).send({ post });
      }
    })
    .catch((error) =>
      res.status(401).send({
        error,
        message: "Erreur lors de la recherche de la publication",
      })
    );
};

exports.update = (req, res) => {
  const postId = req.params.postId;
  const content = req.body.content;
  if(req.file){
  Post.update(
    {
      content: content,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    },
    { where: { id: postId } }
  )
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Mise a jour de la publication id = " + postId,
      });
    })
    .catch((error) =>
      res.status(500).send({
        message: "Erreur lors de la mise à jour de la publication id=" + postId,
        error,
      })
    );
  }else{
    Post.update(
      {
        content: content,
      },
      { where: { id: postId } }
    )
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Mise a jour de la publication id = " + postId,
        });
      })
      .catch((error) =>
        res.status(500).send({
          message: "Erreur lors de la mise à jour de la publication id=" + postId,
          error,
        })
      );
  }
};

exports.delete = (req, res) => {
  const postId = req.params.postId;
  Post.destroy({ where: { id: req.params.postId } })
    .then((post) => {
      if (!post) {
        return res
          .status(400)
          .send({ message: "Publication id=" + postId + " introuvable" });
      } else {
        res.status(200).send({
          status: true,
          message: "Suppression de la publication id = " + postId,
        });
      }
    })
    .catch((error) =>
      res.status(500).send({
        message: "Erreur lors de la suppression de la publication id=" + postId,
        error,
      })
    );
};

exports.getLatest = (req, res) => {
  Post.findAll({
    limit: req.body.numberOfPosts,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
      {
        model: Like,
        include: {
          model: User,
          attributes: ["id", "lastName", "firstName"],
        },
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName", "imageUrl"],
        },
      },
    ],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) =>
      res.status(400).send({
        message: "Erreur lors du chargement des dernieres publications",
        error,
      })
    );
};

exports.getGroupOfPosts = (req, res) => {
  Post.findAll({
    limit: req.body.numberOfPosts,
    offset: req.body.offset,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
      {
        model: Like,
        include: {
          model: User,
          attributes: ["id", "lastName", "firstName"],
        },
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName", "imageUrl"],
        },
      },
    ],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) =>
      res.status(400).send({
        message: "Erreur lors du chargement des dernieres publications",
        error,
      })
    );
};
