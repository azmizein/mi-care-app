const router = require("express").Router();
const { user } = require("../controllers/index");
const { verifyToken, checkRole } = require("../middleware/auth");
const { multerUpload } = require("../helpers/multer");

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/verification", verifyToken, user.verification);
router.post("/changePassword/:id", user.changePassword);
router.get("/allUser", user.findAllUser);
router.get("/getUser/:id", user.getBy);
router.get("/getDoctor/:id", user.getDoctorBy);
router.get("/keepLogin", user.keepLogin);
router.post("/changeotp", user.changeOtp);
router.patch(
  "/editProfile/:id",
  multerUpload.single("images"),
  user.editProfile
);
router.post("/createAddress/:id", user.address);
router.get("/getAddress/:id", user.getDataAdd);
router.delete("/delete/:id", user.remove);

module.exports = router;
