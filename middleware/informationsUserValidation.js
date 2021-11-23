const db = require("../models");
const User = db.user;
const recupUserId = require("../middleware/recupUserIdWithToken");
//Middleware qui vérifier si les infos sont correctes et si l'email n'existe pas deja en BDD
module.exports = async (req, res, next) => {
  const infosObject = JSON.parse(req.body.user);

  const lastName = infosObject.lastName;
  const firstName = infosObject.firstName;
  const email = infosObject.email;
  const password = infosObject.password;
  const role = infosObject.role;

  //Regex de l'email
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Regex du password qui doit contenir entre 8 et 15 caractères, au moins un chiffre et un caractère special
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
  const regexName = /^[a-zA-Z ]+$/;

    if (!regexName.test(lastName) || lastName.length < 2) {
      res.status(400).send({ message: "Nom de famille incorrect" });
    } else if (!regexName.test(firstName) || firstName.length < 2) {
      res.status(400).send({ message: "Prénom incorrect" });
    } else if (!regexEmail.test(email)) {
      res.status(400).send({ message: "Email incorrect" });
    } else if (!regexPassword.test(password)) {
      res.status(400).send({ message: "Mot de passe incorrect" });
    } else {
      User.findOne({ where: { email:email } })
        .then((user) => {
          if (user) {

              res.status(401).send({
                message: "Un utilisateur possède déjà cette adresse email",
              });

          } else {
            next();
          }
        })
        .catch((error) => {
          res.status(500).send({
            error,
            message:
              "Erreur lors de la recherche d'utilisateur avec l'email :" +
              infosObject.email,
          });
        });
    }

};
