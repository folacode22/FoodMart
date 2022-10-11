const Sequelize = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: { type: Sequelize.STRING, allowNull: false },
    productImage: { type: Sequelize.STRING },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
    price: { type: Sequelize.DECIMAL, allowNull: false },
    productStatus: {
      type: Sequelize.STRING,
      enumerable: ["active", "inactive"],
      defaultValue: "active",
      allowNull:true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: { allowNull: false, type: Sequelize.DATE },
  },{
    freezeTableName: true
  });
  return Product
};