const env = require("../config/env.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.comment=require("./comment")(sequelize, Sequelize);
db.like=require("./like")(sequelize, Sequelize);

//Définition des liaisons entre les tables
db.user.hasMany(db.post);
db.user.hasMany(db.like);
db.user.hasMany(db.comment);

db.post.belongsTo(db.user);
db.post.hasMany(db.like);
db.post.hasMany(db.comment);

db.like.belongsTo(db.user);
db.like.belongsTo(db.post);

db.comment.belongsTo(db.post);
db.comment.belongsTo(db.user);

module.exports = db;