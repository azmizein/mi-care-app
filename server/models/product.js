"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart);
      Product.belongsTo(models.Category);
      Product.hasMany(models.Transaction_Detail);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
      composition: {
        type: DataTypes.STRING(1000),
      },
      dosis: {
        type: DataTypes.STRING(250),
      },
      contra: {
        type: DataTypes.STRING(250),
      },
      effect: {
        type: DataTypes.STRING(1000),
      },
      sachet: {
        type: DataTypes.STRING(250),
      },
      manufacture: {
        type: DataTypes.STRING(250),
      },
      registration: {
        type: DataTypes.STRING(250),
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
