const router = require("express").Router();
const { doctor } = require("../controllers/index");
const { multerUpload } = require("../helpers/multer");

router.post("/register", multerUpload.single("images"), doctor.register);
router.post("/login", doctor.login);
router.get("/keepLogin", doctor.keepLogin);

module.exports = router;
