const router = require("express").Router();
const { product } = require("../controllers/index");
const { multerUpload } = require("../helpers/multer");

router.get("/list", product.getAll);
router.patch(
  "/editProduct/:id",
  multerUpload.single("images"),
  product.editProduct
);
router.post("/addProduct", multerUpload.single("images"), product.addProduct);
router.get("/category", product.getAllCategory);
router.get("/listCat/:CategoryId", product.getProductByCategory);
router.get("/list/:id", product.getBy);
router.delete("/delete/:id", product.remove);

module.exports = router;
