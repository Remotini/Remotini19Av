const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors"); //allow us to send data from frontend to backend
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //allow only requests from this origin (frontend in our case)
    credentials: true, //allow the response to include the HTTP only cookie from the server
  })
);

mongoose
  .connect("mongodb://localhost:27017/ProjetFed")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => console.log("Server is running on port 5001"));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.get("/getUsers", async (req, res) => {
  const useData = await UserModel.find({});
  console.log(useData);
  return res.json(useData);
});
app.post("/addUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user); //preparing the data from the front end
  await newUser.save(); //saving data into the db
  return res.json(user);
});
