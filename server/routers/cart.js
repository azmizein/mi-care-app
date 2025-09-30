const router = require("express").Router();
const { cart } = require("../controllers/index");

router.post("/add", cart.addCart);
router.delete("/:id", cart.deleteCart);
router.get("/:id", cart.getCartBy);

module.exports = router;
