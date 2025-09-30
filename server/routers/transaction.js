const router = require("express").Router();
const { transaction } = require("../controllers/index");

router.post("/", transaction.addTransaction);
router.get("/trans/:id", transaction.getTransactionActive);
router.get("/getAllTransactions", transaction.getTransaction);
router.get("/getTransactionDetail/:id", transaction.getTransactionDetail);
router.post("/editTransaction", transaction.updateStatus);

module.exports = router;
