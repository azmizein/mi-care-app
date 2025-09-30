const router = require("express").Router();
const { conversation } = require("../controllers/index");

router.post("/addConversation", conversation.addConversation);
router.get("/getDoctor", conversation.getDoctor);
router.get("/getConversation/:UserId", conversation.getConversation);
router.get(
  "/getConversationDoctor/:DoctorId",
  conversation.getConversationDoctor
);

module.exports = router;
