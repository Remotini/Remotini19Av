const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// loging user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token
    console.log(user);
    const token = createToken(user._id);
    // lahne
    const id = user._id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role;
    const chefId=user.ChefId;
    res.status(200).json({ id, email, token, firstName, lastName ,role ,chefId});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sinup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);

    //create a token
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, email, token, firstName, lastName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
