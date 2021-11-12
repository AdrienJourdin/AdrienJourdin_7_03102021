module.exports = (req, res, next) => {
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  //Regex de l'email
  const regexEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Regex du password qui doit contenir entre 8 et 15 caractères, au moins un chiffre et un caractère special
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
  const regexName = /^[a-zA-Z ]+$/;
    console.log(lastName,firstName,lastName.length,firstName.length);
  if (!regexName.test(lastName) || (lastName.length < 2)) {
    res.status(400).send({ message: "Nom de famille incorrect" });
  } else if (!regexName.test(firstName) || (firstName.length < 2)) {
    res.status(400).send({ message: "Prénom incorrect" });
  } else if (!regexEmail.test(email)) {
    res.status(400).send({ message: "Email incorrect" });
  } else if (!regexPassword.test(password)) {
    res.status(400).send({ message: "Mot de passe incorrect" });
  } else {
    next();
  }
};
