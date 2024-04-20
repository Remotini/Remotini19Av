// Task model
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Validé", "En cours", "Refusé"],
      default: "En cours",
    },
    comments: {
      type: [
        {
          text: String,
          postedBy: {
            type:String,
            required:true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
