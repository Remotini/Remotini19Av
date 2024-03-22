const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//static signup method
userSchema.statics.signup = async function (email, password) {
  //not arrow function because we need 'this'
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use"); //catch it late when call this function
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//export this
module.exports = mongoose.model("Users", userSchema);
