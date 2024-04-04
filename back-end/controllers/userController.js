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
    const token = createToken(user._id);
    const id=user._id;
    res.status(200).json({id,email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sinup user
const signupUser = async (req, res) => {
  const { nom, prenom, email, cin, password, confPass, cdequipe } = req.body;
  try {
    const user = await User.signup(
      nom,
      prenom,
      email,
      cin,
      password,
      confPass,
      cdequipe
    );
    //create a token
    const token = createToken(user._id);
    res.status(200).json({id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
