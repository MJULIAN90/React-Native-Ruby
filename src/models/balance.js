const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("balance", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
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
