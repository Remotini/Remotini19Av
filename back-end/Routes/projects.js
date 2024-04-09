const express = require("express");
const router = express.Router();
const { getProjects } = require("../controllers/projectController");

// CRUD CONVENTION

router.get("/", getProjects);

// Export the router
module.exports = router;
