const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const updateAccount = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("user Id ", userId);
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { firstName, lastName, picturePath} = req.body;

    if (!firstName && !lastName && !picturePath ) {
      return res.status(400).json({
        message: "Cant update if everything is empty",
      });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (picturePath) user.picturePath = picturePath;
    

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user info :", error);
    res.status(500).json({ error: "Failed to update user's info" });
  }
};

// const updatePassword = async (req, res) => {
//   // needs change
//   try {
//     const { userId } = req.query;
//     if (!userId) {
//       return res
//         .status(400)
//         .json({ message: "userId query parameter is required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const { password, confPass, actuelPass } = req.body;

//     if (!(actuelPass === user.password)) {
//       return res.status(400).json({
//         message: "Wrong Password",
//       });
//     } else if (!(password === confPass)) {
//       return res.status(400).json({
//         message: "Veillez vérifiez votre confirmation de mot de passe!",
//       });
//     }

//     user.password = password;

//     await user.save();

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error updating user info :", error);
//     res.status(500).json({ error: "Failed to update user's info" });
//   }
// };

// module.exports = { updateAccount, updatePassword };

const resetPassword = async (req, res) => {
  try {
    const  userId  = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, newPassword, confirmNewPassword } = req.body;
    console.log("enaaaaa");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    console.log("entiiiiiii");
    } else if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "Please make sure your password and confirmation match!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user info :", error);
    res.status(500).json({ error: "Failed to update user's info" });
  }
};

module.exports = { updateAccount, resetPassword };
