module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    type: {
      type: Sequelize.ENUM("perishable", "non-perishable"),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Item;
};
