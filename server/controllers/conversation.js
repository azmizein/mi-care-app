const db = require("../models");
const conversation = db.Conversation;
const { Op } = require("sequelize");
const doctor = db.Doctor;

module.exports = {
  addConversation: async (req, res) => {
    try {
      const { UserId, DoctorId } = req.body;

      const existingConversation = await conversation.findOne({
        where: { UserId: UserId, DoctorId: DoctorId },
      });

      if (existingConversation) {
        res
          .status(400)
          .json({ error: "Percakapan dengan dokter ini sudah ada" });
        return;
      }

      const newConversation = await conversation.create({
        UserId: UserId,
        DoctorId: DoctorId,
      });

      res.status(200).json(newConversation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getConversation: async (req, res) => {
    const userId = req.params.UserId;

    try {
      const products = await conversation.findAll({
        where: {
          UserId: userId,
        },
      });

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getConversationDoctor: async (req, res) => {
    const doctorId = req.params.DoctorId;

    try {
      const products = await conversation.findAll({
        where: {
          DoctorId: doctorId,
        },
      });

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDoctor: async (req, res) => {
    try {
      const doctors = await doctor.findAll({ raw: true });
      return res.status(200).send(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
