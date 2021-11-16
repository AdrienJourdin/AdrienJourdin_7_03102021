const db = require("../models");
const User = db.user;
const recupUserId = require("../middleware/recupUserIdWithToken");

module.exports = async (req, res, next) => {
  const userId = recupUserId.recupUserIdWithToken(req);
  console.log(userId);
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(401).send({
        message: "Utilisateur id=" + userId + " introuvable",
      });
    } else if (user.role == "admin") {
      next();
    } else if (userId == req.params.userId) {
      next();
    } else {
      res
        .status(401)
        .send({ message: "Vous ne pouvez pas modifier cet utilisateur" });
    }
  } catch {
    res.status(400).send({
      message: "Erreur lors de la recuperation des infos de l'utilisateur ",
    });
  }
};
