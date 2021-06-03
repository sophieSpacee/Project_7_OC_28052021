const dbConfig = require("../config/db.config.js");



const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.gifs = require("./gif.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.gifs.hasMany(db.comments, {as: "comments"});
db.comments.belongsTo(db.gifs, {
  foreignKey: 'GifId',
  as: 'gif',
  onDelete: 'CASCADE',
});

db.users.hasMany(db.gifs, {as: "gifs"});
db.gifs.belongsTo(db.users, {
  foreignKey: 'UserId',
  as: 'author',
  onDelete: 'CASCADE',
});

db.users.hasMany(db.comments, {as: "comments"});
db.comments.belongsTo(db.users, {
  foreignKey: 'UserId',
  as: 'author',
  onDelete: 'CASCADE',
});


module.exports = db;