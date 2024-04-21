const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();


const {
  updateAccount,
  updatePassword,
  resetPassword
} = require("../controllers/profileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post("/updateInfos/:id", upload.single("file"), updateAccount);
router.post("/updatePass/:id", resetPassword);
module.exports = router;
