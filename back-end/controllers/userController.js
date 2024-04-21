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
    const cin=user.cin;
    res.status(200).json({ id, email, token, firstName, lastName ,role ,chefId,cin});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sinup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password,cin } = req.body;
  console.log(cin,"cinn")
  try {
    const user = await User.signup(firstName, lastName, email, password,cin);

    //create a token
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, email, token, firstName, lastName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get user by id
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({nom:user.firstName,prenom:user.lastName,email:user.email,role:user.role,ChefId:user.ChefId,cin:user.cin});
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserById,
  getUsers,
};
