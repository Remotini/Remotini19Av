const express = require("express");

const router = express.Router();
const {
  updateAccount,
  updatePassword,
} = require("../controllers/profileController");

router.post("/updateInfos/:id", updateAccount);
router.post("/updatePass/:id", updatePassword);
module.exports = router;
