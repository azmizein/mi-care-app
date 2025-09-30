const db = require("../models");
const user = db.User;
const doctor = db.Doctor;
const addresss = db.Address;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const axios = require("axios");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../helpers/transporter");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, age, phoneNumber } = req.body;

      if (password.length < 8) throw "Minimum 8 characters";

      const data = await user.create({
        password,
        username,
        email,
        phoneNumber,
        age,
      });

      res.status(200).send({
        message: "Register Sukses",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const isUserExist = await user.findOne({
        where: {
          email: email ? email : "",
        },
        raw: true,
      });

      if (!isUserExist) throw "User not found";

      const payload = { email: isUserExist.email, id: isUserExist.id };
      const token = jwt.sign(payload, "final");

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Password Salah`;

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
      const verify = jwt.verify(req.token, "final");

      const result = await user.findOne({
        where: {
          id: verify.id,
        },
        raw: true,
      });

      // const isProflieExist = await db.Profile.findOne({
      //   where: {
      //     id: result.id,
      //   },
      //   raw: true,
      // });

      // result.profilePic = isProflieExist.profilePic;

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      const userToRemove = await user.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!userToRemove) {
        res.status(404).send("User not found");
        return;
      }

      await userToRemove.destroy();
      const users = await user.findAll();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll({ raw: true });
      return res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const { code_otp } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          NIM: req.user.NIM,
        },
        raw: true,
      });

      const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

      if (!isValid) throw `your code otp incorrect...`;

      await user.update(
        { isVerified: true },
        {
          where: {
            NIM: req.user.NIM,
          },
        }
      );
      res.status(200).send({
        message: "Succes Verification",
        data: isAccountExist,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  changeOtp: async (req, res) => {
    try {
      const { NIM } = req.body;

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.update(
        { code_otp: hashOtp },
        {
          where: {
            NIM,
          },
        }
      );

      const isAccountExist = await user.findOne({
        where: { NIM },
        raw: true,
      });

      const token = jwt.sign({ NIM }, "jcwd2204", { expiresIn: "1h" });

      const tempEmail = fs.readFileSync("./template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        username: isAccountExist.username,
        code_otp,
      });

      await transporter.sendMail({
        from: "Admin",
        to: isAccountExist.email,
        subject: "Verifikasi akun",
        html: tempResult,
      });

      res.status(200).send({
        massage: "Check Your Email, code otp send succes",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  editProfile: async (req, res) => {
    try {
      const updatedFields = {
        name: req.body.name,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      };

      if (req.file) {
        updatedFields.images = req.file.filename;
      }

      const update = await user.update(updatedFields, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ message: "Update Profile Complete", update });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  address: async (req, res) => {
    try {
      const { address, city, province, district, UserId, postal_code } =
        req.body;

      const existingAddress = await addresss.findOne({
        where: {
          UserId,
        },
      });

      if (existingAddress) {
        const provinceCity = await axios.get(
          `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=72d398677b44c815f331d75ab9997f8f`
        );
        const nameProvince = provinceCity.data.rajaongkir.results.province;
        const nameCity = provinceCity.data.rajaongkir.results.city_name;
        const nameCityandType = nameCity;

        const updatedData = {
          addressFill: address,
          province: nameProvince,
          city: nameCityandType,
          cityId: city,
          provinceId: province,
          district,
          postal_code,
          UserId,
        };

        await addresss.update(updatedData, {
          where: {
            id: existingAddress.id,
          },
        });

        res.status(200).json({ message: "Address updated successfully" });
      } else {
        const provinceCity = await axios.get(
          `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=72d398677b44c815f331d75ab9997f8f`
        );
        const nameProvince = provinceCity.data.rajaongkir.results.province;
        const nameCity = provinceCity.data.rajaongkir.results.city_name;
        const nameCityandType = nameCity;

        const newData = {
          addressFill: address,
          province: nameProvince,
          city: nameCityandType,
          cityId: city,
          provinceId: province,
          district,
          postal_code,
          UserId,
        };

        await addresss.create(newData);

        res.status(200).json({ message: "Address created successfully" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  },
  getDataAdd: async (req, res) => {
    try {
      const data = await addresss.findAll({
        where: {
          UserId: req.params.id,
        },
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const users = await user.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getDoctorBy: async (req, res) => {
    try {
      const users = await doctor.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;

      const userToUpdate = await user.findOne({ where: { email } });
      if (!userToUpdate) {
        res.status(404).send("User not found");
        return;
      }

      const isValidPassword = await bcrypt.compare(
        oldPassword,
        userToUpdate.password
      );
      if (!isValidPassword) {
        throw "Kata Sandi Lama Anda Salah";
      }

      if (newPassword.length < 8) {
        throw "Kata Sandi Anda Tidak Boleh Kurang Dari 8 Karakter";
      }

      const salt = await bcrypt.genSalt(10);
      const hashNewPassword = await bcrypt.hash(newPassword, salt);

      await user.update(
        {
          password: hashNewPassword,
        },
        {
          where: { email },
        }
      );

      res.status(200).send({
        message: "Password changed successfully",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
