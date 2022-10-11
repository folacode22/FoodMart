const config = require("../config/db.config");
const pg = require("pg");
const Sequelize = require("sequelize");
const user = require("./user");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.cart = require("./cart")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);

db.user.hasMany(db.product, {as:"product"})
db.product.belongsTo(db.user,{
  foreignKey: "userId",
  as:"user"
});

db.user.hasOne(db.cart);
// db.cart.belongsToMany(db.product,
//   through : db.cart);
db.order.belongsTo(db.user);









module.exports = db;
