const db = require("../models");
const cart = db.Cart;
const transaction = db.Transaction;
const transaction_detail = db.Transaction_Detail;
const product = db.Product;
const { Op } = require("sequelize");
const user = db.User;

module.exports = {
  addTransaction: async (req, res) => {
    try {
      const { id, data, total, status, noInvoice } = req.body;

      const transactionId = await transaction.create({
        noInvoice,
        total: total,
        UserId: id,
        status,
      });

      data.map(async (item) => {
        await transaction_detail.create({
          ProductId: item.Product.id,
          TransactionId: transactionId.dataValues.id,
        });
      });

      data.map(async (item) => {
        await cart.destroy({
          where: {
            id: item.id,
          },
        });
      });

      res.status(200).send({
        message: "Transaksi Succes",
        transactionId,
      });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },

  getTransactionActive: async (req, res) => {
    try {
      const { id } = req.params;
      const transactions = await transaction.findAll({
        where: {
          [Op.and]: {
            UserId: id,
          },
        },
        include: [
          {
            model: user,
            attributes: ["images", "username", "email", "phoneNumber", "age"],
          },
          {
            model: transaction_detail,
            include: [
              {
                model: product,
              },
            ],
          },
        ],
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getTransaction: async (req, res) => {
    try {
      const getTransactions = await transaction.findAll({
        include: [
          { model: user },
          {
            model: transaction_detail,
            include: [
              {
                model: product,
              },
            ],
          },
        ],
        raw: true,
      });
      return res.status(200).send(getTransactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getTransactionDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const getTransactions = await transaction_detail.findAll({
        where: {
          TransactionId: id,
        },
        include: [
          {
            model: product,
          },
        ],
        raw: true,
      });
      return res.status(200).send(getTransactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { noInvoice, transaction_status } = req.body;

      const updateTrans = await transaction.update(
        {
          status: transaction_status,
        },
        {
          where: {
            noInvoice,
          },
        }
      );
      console.log(updateTrans);
      res.status(200).send({
        message: "Berhasil",
        updateTrans,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
