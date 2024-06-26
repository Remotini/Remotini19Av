require("dotenv").config();
const User = require("./models/userModel.js");
const Project = require("./models/projectModel.js");
const express = require("express");
const app = express();
const cors = require("cors"); //allow us to send data from frontend to backend
const userRoutes = require("./Routes/user.js");
const reportRoutes = require("./Routes/reports.js");
const taskRoutes = require("./Routes/tasks.js");
const projectRoutes = require("./Routes/projects.js");
const chefRoutes = require("./Routes/chef.js");
const profileRoutes = require("./Routes/profile.js");
const adminRoutes= require("./Routes/admin.js");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose"); // Import the mongoose package
//middleware
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173", //allow only requests from this origin (frontend in our case)
//     credentials: true, //allow the response to include the HTTP only cookie from the server
//   })
// );
app.use(cors());
app.use(express.static('public'));
 


//routes
app.use("/api/user", userRoutes);  
app.use("/api/reports", reportRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin",adminRoutes);
// THE TWO FUNCTIONS BELOW ARE FOR TESTING

// for adding projects
app.post("/projects", async (req, res) => {
  try {
    const { name, startDate, deadline } = req.body;

    const newProject = new Project({
      name,
      startDate,
      deadline,
    });

    // Save the project to the database
    await newProject.save();

    // Fetch all users
    const users = await User.find();

    // Update projects array for each user
    await Promise.all(
      users.map(async (user) => {
        user.projects.push(newProject._id); // Push new project ID
        await user.save();
      })
    );

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ADD USERS TO THE CHEF

// hedhouma mayjiwch lenna create an endpoint for each of them an make a route for the chef
app.patch("/addUser", async (req, res) => {
  try {
    const { userId, chefId } = req.body;
    if (!userId || !chefId) return res.sendStatus(400);

    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found!" });
    }

    // Push the new user to the chef's employees array
    chef.employee.push({ _id: userId, workersReports: [] });
    await chef.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { ChefId: chefId },
      { new: true }
    );

    res.json({ user, chef });
  } catch (err) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});
app.patch("/removeUser", async (req, res) => {
  try {
    const { userId, chefId } = req.body;
    if (!userId || !chefId) return res.sendStatus(400);

    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found!" });
    }

    // Remove the user from the chef's employees array
    chef.employee = chef.employee.filter((emp) => emp._id != userId);
    await chef.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { ChefId: null },
      { new: true }
    );

    res.json({ user, chef });
  } catch (err) {
    console.error("Error removing user:", error);
    res.status(500).json({ error: "Failed to remove user" });
  }
});
app.patch("/addReport", async (req, res) => {
  try {
    const { chefId, userId, rapportId } = req.body;

    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found!" });
    }

    // Find the employee (sender) by id in the chef's employees array
    const employeeIndex = chef.employee.findIndex((emp) => emp._id == userId);
    if (employeeIndex === -1) {
      return res.status(404).json(userId);
    }

    // Push the rapportId to the employee's workersReports array
    chef.employee[employeeIndex].workersReports.push(rapportId);
    await chef.save();

    res.json({ message: "Rapport added to employee successfully" });
  } catch (error) {
    console.error("Error adding rapport to employee:", error);
    res.status(500).json({ error: "Failed to add rapport to employee" });
  }
});
mongoose
  .connect(process.env.MONGO_URI1)
  .then(() => {
    console.log("Connected to MongoDB+server");
    app.listen(process.env.PORT, () =>
      console.log("Server is running on port 5001")
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
