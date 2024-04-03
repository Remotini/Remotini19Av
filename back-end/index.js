require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); //allow us to send data from frontend to backend
const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/reports");
const taskRoutes = require("./routes/tasks");
const mongoose = require("mongoose"); // Import the mongoose package
//middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", //allow only requests from this origin (frontend in our case)
    credentials: true, //allow the response to include the HTTP only cookie from the server
  })
);
//routes
app.use("/api/user", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tasks", taskRoutes);

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
