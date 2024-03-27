const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  // Define your report model fields here
  // For example:
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
