"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stockQuantity: DataTypes.INTEGER,
    warrantyPeriod: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  // Product.associate = function (models) {
  //   Product.belongsTo(models.ProductImage,{
  //     foreignKey: "productId",
   
  //   })
  // };
  Product.associate = function (models) {
    Product.hasMany(models.ProductImage, {
      foreignKey: "productId",
      as: "images", // Alias to use in include statements
    });
  }
  return Product;
};
