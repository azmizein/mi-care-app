const router = require("express").Router();
const { post } = require("../controllers/index");
const { multerUpload } = require("../helpers/multer.js");

router.get("/getPost", post.getAll);
router.get("/getPost/:id", post.getBy);
router.delete("/delete/:id", post.remove);
router.post("/editPost/:id", multerUpload.single("file"), post.editPost);
router.post("/addPost", multerUpload.single("file"), post.addPost);

module.exports = router;
