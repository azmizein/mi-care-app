const router = require("express").Router();
const { payment } = require("../controllers/index");

router.post("/paymentReq", payment.paymentPost);
router.post("/shipping", payment.shipping);
router.get("/city/:provinceId", payment.getCity);
router.get("/province", payment.getProvince);
router.post("/status", payment.getStatus);

module.exports = router;
