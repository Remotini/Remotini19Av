const express = require("express");

const router = express.Router();
const {
  updateAccount,
  updatePassword,
  resetPassword
} = require("../controllers/profileController");

router.post("/updateInfos/:id", updateAccount);
router.post("/updatePass/:id", resetPassword);
module.exports = router;
