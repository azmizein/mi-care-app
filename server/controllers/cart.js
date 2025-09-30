const db = require("../models");
const user = db.User;
const cart = db.Cart;
const product = db.Product;
const midtransClient = require("midtrans-client");

module.exports = {
  addCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      console.log(req.body);
      if (!UserId) throw "Please Login First";

      const data = await cart.create({
        ProductId,
        UserId,
      });
      res.status(200).send({
        message: "Berhasil Menambahkan Produk Kedalam Keranjang",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await cart.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        msg: "Cart Deleted!",
        result,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getCartBy: async (req, res) => {
    try {
      const { id } = req.params;
      const getcart = await cart.findAll({
        attributes: ["id"],
        where: {
          UserId: id,
        },
        include: [
          { model: user, attributes: ["username"] },
          { model: product },
        ],
      });
      res.status(200).send(getcart);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  paymentPost: async (req, res) => {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-JcgSpb1NvmiIQQAvh0sPfBdV",
        clientKey: "SB-Mid-client-5giWJrCY5bo_j3S0",
      });
      const parameter = {
        transaction_details: {
          order_id: req.body.id,
          gross_amount: req.body.total,
        },
        customer_details: {
          email: req.body.email,
          first_name: req.body.username,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        const dataPayment = {
          response: JSON.stringify(transaction),
        };
        const token = transaction.token;
        res.status(200).send({ message: "success", dataPayment, token: token });
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
