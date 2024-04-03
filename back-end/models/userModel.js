const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const validator = require("validator");
const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confPass: {
    type: String,
    required: true,
  },
  cdequipe: {
    type: String,
    required: true,
  },
  reports: [ 
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
  role: {
    type: String,
    default: "TT",
  },
});
//static login method

//static login method
//static login method why we used this ?
//because we don't want to create an instance of the user model and
//call the login method on it , we just want to call it like UserModel.login(email,password)
//it's more convenient and it's a common practice in nodejs
userSchema.statics.login = async function (email, password) {
  if (!email || !password)
    throw Error("email et mot de passe sont obligatoires");
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("mot de passe incorrect");
  }
  throw Error("adresse email incorrecte");
};

//static signup method
//not arrow function because we need 'this'
userSchema.statics.signup = async function (
  nom,
  prenom,
  email,
  cin,
  password,
  confPass,
  cdequipe
) {
  //validation
  if (
    !email ||
    !password ||
    !nom ||
    !prenom ||
    !cin ||
    !cdequipe ||
    !confPass
  ) {
    throw Error("Tous les champs doivent être remplis");
  }

  if (!validator.isEmail(email)) {
    throw Error("L'email n'est pas valide");
  }
  if (password !== confPass) {
    throw Error("Les mots de passe ne sont pas identiques");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Le mot de passe est faible ");
  }
  if (cin.toString().length !== 8) {
    throw Error("Le cin doit avoir 8 chiffres");
  }
  const exitingUser = await this.findOne({ cin });
  if (exitingUser) {
    throw Error("Le cin est déjà utilisé");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("L'adresse email est déjà utilisée"); //catch it late when call this function
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    nom,
    prenom,
    email,
    cin,
    password: hash,
    confPass: hash,
    cdequipe,
  });

  return user;
};

//export this
module.exports = mongoose.model("users", userSchema);
