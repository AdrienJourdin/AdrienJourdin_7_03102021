module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      isAlphanumeric: true
    },
    lastName: {
      type: Sequelize.STRING,
      isAlphanumeric: true
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      isEmail:true
    },
    role: {
      type: Sequelize.STRING,
      isAlphanumeric: true
    }
  });

  return User;
};