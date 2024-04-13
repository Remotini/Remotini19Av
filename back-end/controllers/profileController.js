const User = require("../models/userModel");

const updateAccount=async(req, res)=>{
    try{
        const {firstName, lastName, picturePath, cin }=req.body;

        if(!firstName || !lastName || !picturePath || !cin){
            return res.status(400).json({
                message: "Cant update if everything is empty",
            });
        }

        let user= await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found!"});
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