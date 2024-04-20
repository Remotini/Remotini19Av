// Project model
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    startDate: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
