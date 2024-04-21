const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  createTask,
  getTasks,
  modifyTask,
  deleteTask,
} = require("../controllers/taskController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), createTask);
router.get("/", getTasks);
router.put("/:id",upload.single("file"), modifyTask);
router.delete("/:id", deleteTask);

module.exports = router;
