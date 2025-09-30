const db = require("../models");
const message = db.Message;

module.exports = {
  addMessage: async (req, res) => {
    try {
      const newMessage = await message.create(req.body);
      res.status(201).json(newMessage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getMessage: async (req, res) => {
    const CoversationId = req.params.ConversationId;
    try {
      const messages = await message.findAll({
        where: { ConversationId: CoversationId },
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
