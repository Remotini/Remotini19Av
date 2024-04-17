const express = require("express");

const router= express.Router();
const {updateAccount, updatePassword}= require ("../controllers/profileController");

router.post("/Profile/:id", updateAccount);
router.post("/Profile/:id", updatePassword);

module.exports= router;