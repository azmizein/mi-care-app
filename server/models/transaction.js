"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.hasMany(models.Transaction_Detail);
    }
  }
  Transaction.init(
    {
      noInvoice: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
