'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {});
  // ProductImage.associate = function(models) {
  //   // associations can be defined here
  //   ProductImage.hasOne(models.Product, {
  //     foreignKey: "productId",
  //     as: "product", // alias for easier access
  //   });
  // };
  ProductImage.associate = function (models) {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };
  return ProductImage;
};