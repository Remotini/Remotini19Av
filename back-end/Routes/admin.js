const express = require("express");
const router = express.Router();
const {deleteUser,addUser} = require("../controllers/adminController");

router.delete("/delete/:id",deleteUser)
router.post("/add",addUser)
module.exports = router;