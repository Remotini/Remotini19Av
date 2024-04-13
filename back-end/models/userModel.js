const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const validator = require("validator");
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cin: {
    type: Number,

    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  confPass: {
    type: String,
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  rapports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  role: {
    type: String,
    enum: ["Chef", "User"],
    default: "User",
  },
  employee: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      workersReports: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Report",
        },
      ],
    },
  ],
  ChefId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
//static login method
//static login method
//static login method why we used this ?
//because we don't want to create an instance of the user model and
//call the login method on it , we just want to call it like UserModel.login(email,password)
//it's more convenient and it's a common practice in nodejs
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  console.log("login");
  if (!user) {
    return res.status(401).json("Invalid email ");
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(401).json("Invalid password");
  }
  return user;
};
//static signup method
//not arrow function because we need 'this'
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  //validation
  if (!email || !password || !firstName || !lastName) {
    throw Error("Tous les champs doivent être remplis");
  }

  if (!validator.isEmail(email)) {
    throw Error("L'email n'est pas valide");
  }
  // if (password !== confPass) {
  //   throw Error("Les mots de passe ne sont pas identiques");
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Le mot de passe est faible ");
  // }
  // if (cin.toString().length !== 8) {
  //   throw Error("Le cin doit avoir 8 chiffres");
  // }
  // const exitingUser = await this.findOne({ email });
  // if (exitingUser) {
  //   throw Error("L'email est déjà utilisé");
  // }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("L'adresse email est déjà utilisée"); //catch it late when call this function
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};
//export this
module.exports = mongoose.model("users", userSchema);
