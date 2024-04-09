const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
