const router = require("express").Router();
const { message } = require("../controllers/index");

router.post("/addMessage", message.addMessage);
router.get("/getMessage/:ConversationId", message.getMessage);

module.exports = router;
