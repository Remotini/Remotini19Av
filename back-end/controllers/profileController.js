const User = require("../models/userModel");

const updateAccount=async(req, res)=>{
    try{
        const {userId}=req.query;
        if (!userId) {
            return res
              .status(400)
              .json({ message: "userId query parameter is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const {firstName, lastName, picturePath, cin }=req.body;

        if(!firstName || !lastName || !picturePath || !cin){
            return res.status(400).json({
                message: "Cant update if everything is empty",
            });
        }

        user.firstName=firstName;
        user.lastName=lastName;
        user.picturePath=picturePath;
        user.cin=cin;

        await user.save();

        res.status(200).json(user);
    }catch(error){
        console.error("Error updating user info :", error);
        res.status(500).json({ error: "Failed to update user's info" });
    }
}

const updatePassword=async(req, res)=>{
    try{
        const {userId}=req.query;
        if (!userId) {
            return res
              .status(400)
              .json({ message: "userId query parameter is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const {password, confPass, actuelPass }=req.body;

        if(!(actuelPass===user.password)){
            return res.status(400).json({
                message: "Wrong Password",
            });
        }else if(!(password===confPass)){
            return res.status(400).json({
                message:"Veillez vérifiez votre confirmation de mot de passe!"
            });
        }

        user.password=password;

        await user.save();

        res.status(200).json(user);
    }catch(error){
        console.error("Error updating user info :", error);
        res.status(500).json({ error: "Failed to update user's info" });
    }
}

module.exports={updateAccount, updatePassword};