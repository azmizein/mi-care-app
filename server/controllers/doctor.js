const db = require("../models");
const doctor = db.Doctor;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, email, password, specialist } = req.body;
      const images = req.file.filename; // Assign req.file.filename to images

      console.log({ firstName, email, password, specialist, images });

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = await doctor.create({
        firstName,
        email,
        password: hashPass,
        images,
        specialist,
      });

      const token = jwt.sign({ firstName }, "azmi");

      res.status(200).send({
        message: "Register Success",
        data,
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { firstName, password } = req.body;

      const isUserExist = await doctor.findOne({
        where: {
          firstName: firstName ? firstName : "",
        },
        raw: true,
      });

      if (!isUserExist) throw "User not found";

      const payload = { id: isUserExist.id };
      const token = jwt.sign(payload, "jcwd2204");

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Wrong password`;

      res.status(200).send({
        message: "Login Succes",
        isUserExist,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      const result = await doctor.findOne({
        where: {
          id: verify.id,
        },
        raw: true,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
