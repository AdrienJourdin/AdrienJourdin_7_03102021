const db = require("../models");
const User = db.user;
const recupUserId = require("../middleware/recupUserIdWithToken");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  const userId = recupUserId.recupUserIdWithToken(req);
  const password = req.body.password;

  User.findOne({ where: { id: userId } })
    .then((user) => {
        
      if (!user) {
        return res.status(401).send({
          error: "Utilisateur id=" + userId + " introuvable",
        });
      } else {
        
        if ((user.role = "admin")) {
          next();
        } else {
          bcrypt
            .compare(password, user.password)
            .then((valid) => {
              if (!valid) {
                return res
                  .status(401)
                  .send({ message: "Mot de passe incorrect" });
              } else {
                next();
              }
            })
            .catch(
              res
                .status(500)
                .send({
                  message: "Erreur lors de la comparaison des mots de passe",
                })
            );
        }
      }
    })
    .catch(
      res
        .status(500)
        .send({
          error,
          message: "Erreur lors de la recuperation des infos de l'utilisateur",
        })
    );
};
