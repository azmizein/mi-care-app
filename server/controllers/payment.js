const midtransClient = require("midtrans-client");
const axios = require("axios");

module.exports = {
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
      console.log(err);
    }
  },

  shipping: async (req, res) => {
    try {
      const { destination, courier } = req.body;

      const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin: "455",
          destination: destination,
          weight: 1000,
          courier,
        },
        {
          headers: {
            key: "72d398677b44c815f331d75ab9997f8f",
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      const shippingCosts = response.data;

      res.json(shippingCosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Masukan alamat terlebih dahulu" });
    }
  },

  getCour: async (req, res) => {
    try {
      const { destination, weight, courier } = req.body;

      const response = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        {
          origin: "455",
          destination: destination,
          weight,
          courier,
        },
        {
          headers: {
            key: "72d398677b44c815f331d75ab9997f8f",
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      const shippingCosts = response.data;

      res.json(shippingCosts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching shipping costs." });
    }
  },

  getCity: async (req, res) => {
    try {
      const id = req.params.provinceId;
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${id}`,
        { headers: { key: "72d398677b44c815f331d75ab9997f8f" } }
      );
      console.log(id);
      res.status(200).send(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  },

  getProvince: async (req, res) => {
    try {
      const response = await axios({
        url: "https://api.rajaongkir.com/starter/province",
        headers: {
          key: "72d398677b44c815f331d75ab9997f8f",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const cities = response.data.rajaongkir.results;

      res.json({ cities });
    } catch (error) {
      console.error("Error:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching city data." });
    }
  },

  getStatus: async (req, res) => {
    try {
      const { order_id } = req.body;
      const serverKey = "SB-Mid-server-JcgSpb1NvmiIQQAvh0sPfBdV";
      const url = `https://api.sandbox.midtrans.com/v2/${order_id}/status`;
      const options = {
        headers: {
          accept: "application/json",
          authorization: `Basic ${Buffer.from(`${serverKey}:`).toString(
            "base64"
          )}`,
        },
      };

      const response = await axios.get(url, options);
      res.json(response.data);
    } catch (error) {
      console.error("Error:", error.message, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
