const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "L-IMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 1000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

exports.multerUpload = multer({ storage });
