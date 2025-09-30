const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const path = require("path");

require("dotenv").config();

server.use(express.json());
server.use(cors());
// server.use(express.static("./Public"));
server.use("/Public", express.static("./Public"));

server.use(bearerToken());

const {
  userRoutes,
  cartRoutes,
  adminRoutes,
  doctorRoutes,
  productRoutes,
  paymentRoutes,
  postRoutes,
  transactionRoutes,
  messageRoutes,
  conversationRoutes,
} = require("./routers");
server.use("/user", userRoutes);
server.use("/cart", cartRoutes);
server.use("/admin", adminRoutes);
server.use("/product", productRoutes);
server.use("/doctor", doctorRoutes);
server.use("/payment", paymentRoutes);
server.use("/post", postRoutes);
server.use("/transaction", transactionRoutes);
server.use("/message", messageRoutes);
server.use("/conversation", conversationRoutes);

server.listen(PORT, () => {
  db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
