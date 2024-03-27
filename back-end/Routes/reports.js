const express = require("express");

const router = express.Router();

// Get all reports
router.get("/", (req, res) => {
  res.json({ message: "Get all reports" });
});

// Create a report
router.post("/", (req, res) => {});

// Delete a report
router.delete("/:id", (req, res) => {});

// Modify a report
router.put("/:id", (req, res) => {});

// Export the router
module.exports = router;
