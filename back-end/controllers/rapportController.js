const Report = require("../models/reportModel");

// Import any necessary modules or dependencies

// Define your controller functions
const addReport = (req, res) => {
  const { title, description } = req.body;

  const newReport = new Report({
    title,
    description,
  });

  newReport
    .save()
    .then((report) => {
      res.status(201).json(report);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create report" });
    });
};

module.exports = {
  addReport,
  deleteReport,
  updateReport,
  getReport,
};
