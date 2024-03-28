const Sequelize = require("sequelize");
const sequelize = new Sequelize("food-delivery", "root", "root1234", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Organization = require("./organization")(sequelize, Sequelize);
db.Item = require("./item")(sequelize, Sequelize);
db.Pricing = require("./pricing")(sequelize, Sequelize);

db.Organization.hasMany(db.Pricing);
db.Pricing.belongsTo(db.Organization);
db.Item.hasMany(db.Pricing);
db.Pricing.belongsTo(db.Item);

module.exports = db;
