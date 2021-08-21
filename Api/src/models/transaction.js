const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    id_transaction: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type_transaction: { type: DataTypes.STRING, allowNull: false },
    csend: { type: DataTypes.STRING, allowNull: false },
    creceive: { type: DataTypes.STRING, allowNull: false },
    asend: { type: DataTypes.FLOAT, allowNull: false },
    areceive: { type: DataTypes.FLOAT, allowNull: false },
  });
};
