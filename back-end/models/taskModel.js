const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Import the required modules

// Define the task schema
const taskSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  datePub: {
    type: String,
    default: () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  DateComp: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "En cours",
  },
});

// Create the task model
const Task = mongoose.model("Task", taskSchema);

// Export the task model
module.exports = Task;
