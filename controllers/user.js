//import du modele
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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
        }).then((user) => {
          res.status(200).send({
            status: true,
            message: "user created successfully",
          });
          
        })
        .catch(error => res.status(500).send({ error }));

  });
};

exports.login = (req, res, next) => {
  User.findOne( req.body.email, (err,data)=>{
    console.log(data);
    if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
          });
        }
      } else {
          
        bcrypt.compare(req.body.password, data.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).send({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).send({
              userId: data.id,
              token: jwt.sign(
                { userId: data.id },
                'TOKEN_groupomania_1870',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).send({ error }));
    
    }

});
};

exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };