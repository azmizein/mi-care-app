"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User);
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      addressFill: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.INTEGER,
      },
      detail: { type: DataTypes.STRING },
      district: { type: DataTypes.STRING },
      province: {
        type: DataTypes.STRING,
      },

      city: {
        type: DataTypes.STRING,
      },
      cityId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
