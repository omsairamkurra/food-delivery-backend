module.exports = (sequelize, Sequelize) => {
  const Organization = sequelize.define("organization", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Organization;
};
