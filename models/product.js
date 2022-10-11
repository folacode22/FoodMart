const Sequelize = require('sequelize');
const { user } = require('.');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      productName: { type: DataTypes.STRING, allowNull: false },
      productImage: { type: DataTypes.STRING },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      productStatus: {
        type: DataTypes.STRING,
        enumerable: ["active", "inactive"],
        defaultValue: "active",
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: { allowNull: false, type: DataTypes.DATE },
    },
    {
      freezeTableName: true,
    }
  );
  
 
  return Product;
};