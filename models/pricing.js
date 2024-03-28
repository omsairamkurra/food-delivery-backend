module.exports = (sequelize, Sequelize) => {
  const Pricing = sequelize.define("pricing", {
    zone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    base_distance_in_km: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    km_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    fix_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  return Pricing;
};
