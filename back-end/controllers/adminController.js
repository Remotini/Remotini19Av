const mongoose = require("mongoose");

const User = require("../models/userModel");
const Rapport = require("../models/reportModel");
const Task = require("../models/taskModel");

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //remove all the reports related to a user 
        for (let _id of user.rapports){
            const report = await Rapport.findById(_id);
            if (report){
                for(let _id of report.tasks){
                     await Task.findByIdAndDelete(_id);
                }
                await Rapport.findByIdAndDelete(report._id);
            }
             
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted"});
    }catch(err){
        console.log(err);
    }
}
exports.addUser = async (req, res) => {
    try{
        const  {email,cin} = req.body;
        const existingUserbyEmail =await User.findOne({email});
        if (existingUserbyEmail){
            return res.status(400).json({message: "email already in use "})
        }
        const existingUserbyCin =await User.findOne({cin});
        if (existingUserbyCin){
            return res.status(400).json({message: "CIN already in use "})
        }
        const user = await User.create(req.body);
        res.status(201).json({user});
    }catch(err){
        res.status(400).json({message: err});
    }
}