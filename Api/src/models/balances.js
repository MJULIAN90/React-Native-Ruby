const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("balances", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    btc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    usd: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
