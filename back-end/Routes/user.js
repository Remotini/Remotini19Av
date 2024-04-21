const express = require("express");

// controllers
const { loginUser, signupUser,getUserById,getUsers} = require("../controllers/userController");

const router = express.Router();

// log in route

router.post("/login", loginUser);

//sign up route

router.post("/signup", signupUser);

//get user by id
router.get("/:id",getUserById);

//get All users 
router.get("/",getUsers)

module.exports = router;
