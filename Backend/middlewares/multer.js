const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    // cb(error, "/images");
    cb(error, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    const nameWithoutExtension = path.parse(file.originalname).name;
    const name = nameWithoutExtension.toLowerCase().split(" ").join("-");

    // console.log(nameWithoutExtension)
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

module.exports = multer({ storage: storage }).single("image");
