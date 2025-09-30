const { createTransport } = require("nodemailer");

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "muhammadazmizein10@gmail.com",
    pass: "iorozvgetuhowcjy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
