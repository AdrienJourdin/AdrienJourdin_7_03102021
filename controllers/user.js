//import du modele
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config.js");
const User = db.user;

exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

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
      .catch((error) => res.status(500).send({ error }));
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      console.log(user);
      if (user == null) {
        return res.status(401).send({ error: "Utilisateur introuvable" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Mot de passe incorrect !" });
          }
          res.status(200).send({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "TOKEN_groupomania_1870", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => res.status(401).send({ error }));
};

exports.delete = (req, res) => {
  console.log(req.params.userId);
  User.destroy({ where: { id: req.params.userId } })
    .then(() => {
      res.status(200).send({
        status: true,
        message: "User deleted successfully with id = " + req.params.userId,
      });
    })
    .catch((error) =>
      res.status(500).send({
        message: "erreur lors de la suppression de l'utilisateur",
      })
    );
};

exports.update = (req, res) => {
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
        { where: { id: req.params.userId } }
      )
        .then(() => {
          res.status(200).json({
            status: true,
            message: "User updated successfully with id = " + req.params.userId,
          });
        })
        .catch((error) =>
          res.status(500).send({
            message: "erreur lors de la mise à jour des infos du user",
          })
        );
    })
    .catch((error) =>
      res.status(500).send({ message: "Erreur lors du cryptage du mdp" })
    );
};

exports.getOne = (req, res) => {
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      if (user == null) {
        return res.status(401).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    })
    .catch((error) => res.status(401).send({ error }));
};

exports.getAll = (req, res) => {
  User.findAll()
    .then((users) => {
        let usersWithoutPassword=[];
        for (let user of users){
            let userInfos={
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            };
            usersWithoutPassword.push(userInfos);
        }
        res.status(200).send(usersWithoutPassword)
    })
    .catch((error) => res.status(401).send({ error }));
};
