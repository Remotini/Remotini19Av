const express = require("express");
const multer = require("multer");

// controllers
const {
  loginUser,
  signupUser,
  getUserById,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

//multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// log in route

router.post("/login", loginUser);

//sign up route

router.post("/signup", upload.single("file"), signupUser);

//get user by id
router.get("/:id", getUserById);

//get All users
router.get("/", getUsers);

module.exports = router;
