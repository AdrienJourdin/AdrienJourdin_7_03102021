//import du modele
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Post = db.post;
const User = db.user;
const Like = db.like;
const Comment = db.comment;

exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Le contenue de votre requête ne doit pas être vide",
    });
  }
  //Recherche d'un potentiel utilisateur ayant la même adresse email que celle de la requete
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      //Si c'est le cas => retour d'un message d'erreur
      if (user) {
        return res
          .status(401)
          .send({ message: "Un utilisateur possède déjà cette adresse email" });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error,
        message:
          "Erreur lors de la recherche d'utilisateur avec l'email :" +
          req.body.email,
      });
    });
  //Hashage du mot de passe
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // Sauvegarde de l'user dans ma database
    User.create({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: hash,
      email: req.body.email,
      role: req.body.role,
    })
      .then((user) => {
        res.status(200).send({
          status: true,
          message: "user created successfully",
        });
      })
      .catch((error) =>
        res
          .status(500)
          .send({ error, message: "Erreur lors du hashage du mot de passe" })
      );
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).send({
          error: "Utilisateur email=" + req.body.email + " introuvable",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Mot de passe incorrect" });
          }
          res.status(200).send({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "TOKEN_groupomania_1870", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) =>
          res.status(500).send({
            error,
            message: "erreur lors de la vérification du mot de passe",
          })
        );
    })
    .catch((error) =>
      res.status(401).send({
        error,
        message: "Erreur lors de la recherche de l'utilisateur ",
      })
    );
};

exports.delete = (req, res) => {
  const userId = req.params.userId;
  //Recherche de l'existence de l'utilisateur
  User.findOne({ where: { id: userId } })
    .then((user) => {
      //Si il n'existe pas => envoi d'un message d'erreur
      if (!user) {
        return res
          .status(401)
          .send({ message: "Utilisateur id=" + userId + " Introuvable" });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error,
        message: "erreur lors de la recherche de l'utilisateur id=" + userId,
      });
    });

  //Si l'utilisateur existe => appel de la fonction destroy pour supprimer son compte
  User.destroy({ where: { id: userId } })
    .then(() => {
      res.status(200).send({
        status: true,
        message: "User deleted successfully with id = " + userId,
      });
    })
    .catch((error) =>
      res.status(500).send({
        message: "erreur lors de la suppression de l'utilisateur id=" + userId,
      })
    );
};

exports.update = (req, res) => {
  const userId = req.params.userId;
  const email=req.body.email;
  //Recherche de l'existence de l'utilisateur
  User.findOne({ where: { id: userId } })
    .then((user) => {
      //Si il n'existe pas => envoi d'un message d'erreur
      if (!user) {
        return res
          .status(401)
          .send({ message: "Utilisateur id=" + userId + " Introuvable" });
      //Si il existe vérification de l'existence de l'adresse mail en BDD    
      }else{
        User.findOne({where: { email: email }})
        .then(user=>{
          //Si le mail existe => envoi d'un message d'erreur
          if(user){
            return res.status(400).send({message:"Un utilisateur possède déjà cette adresse mail"})
            //Si il n'existe pas => appel de la fonction update
          }else{
            bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              User.update(
                {
                  lastName: req.body.lastName,
                  firstName: req.body.firstName,
                  password: hash,
                  email: req.body.email,
                  role: req.body.role,
                },
                { where: { id:userId } }
              )
                .then(() => {
                  res.status(200).json({
                    status: true,
                    message: "User updated successfully with id = " + userId,
                  });
                })
                .catch((error) =>
                  res.status(500).send({
                    message: "erreur lors de la mise à jour des infos du user id="+userId,
                  })
                );
            })
            .catch((error) =>
              res.status(500).send({ message: "Erreur lors du cryptage du mdp" })
            );
            
          }
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        error,
        message: "erreur lors de la recherche de l'utilisateur id=" + userId,
      });
    });




};

exports.getOne = (req, res) => {
  const userId = req.params.userId;
  User.findOne({
    where: { id: userId },
    attributes: ["id", "lastName", "firstName", "email"],
    includes: [
      {
        model: Post,
        attributes: ["id", "title", "content", "createdAt"],
        includes: {
          model: Like,
        },
      },
      {
        model: Like,
      },
      {
        model: Comment,
        attributes: ["id", "content"],
        includes: {
          model: User,
          attributes: ["id", "lastName", "firstName"],
        },
      },
    ],
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ error: "Utilisateur id=" + userId + " introuvable" });
      }
      res.status(200).send({ user });
    })
    .catch((error) => res.status(401).send({ error }));
};

exports.getAll = (req, res) => {
  User.findAll({
    attributes: ["id", "lastName", "firstName", "email"],
  })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => res.status(401).send({ error }));
};
