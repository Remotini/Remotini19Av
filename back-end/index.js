require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/userModel");
const cors = require("cors"); //allow us to send data from frontend to backend
const userRoutes = require("./routes/user");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", //allow only requests from this origin (frontend in our case)
    credentials: true, //allow the response to include the HTTP only cookie from the server
  })
);

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
      console.log("Server is running on port 5001")
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
