const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

module.exports = async (req, res, next) => {
  const infosObject=JSON.parse(req.body.user);
  const role = infosObject.role;
  console.log(req.file);
  if (role == "admin") {
      if(infosObject.passwordAdmin){
    const passwordAdmin = infosObject.passwordAdmin;
    try {
      const user =await User.findOne({ where: { email: "administrator@admin.com" } });
      try {
        const validation = await bcrypt.compare(passwordAdmin, user.password);
        console.log(validation);
        if (!validation) {
          res
            .status(404)
            .send({ message: "Code confidentiel Admin incorrect" });
        } else {
          next();
        }
      } catch {
        res
          .status(404)
          .send({
            message: "Erreur lors de la comparaison des mot de passes admin",
          });
      }
    } catch {
      res
        .status(404)
        .send({
          message: "Erreur lors de la recherche des infos du compte admin",
        });
    }
}else{
    res
    .status(401)
    .send({
      message: "Veuillez rentrer le code confidentiel",
    });
}
  } else if (role == "user") {
      next();
  }else{
    res
    .status(401)
    .send({
      message: "Role incorrect",
    });
  }
};
