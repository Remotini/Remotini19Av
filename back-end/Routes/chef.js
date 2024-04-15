const express = require("express");
const router = express.Router();
const { getUsers, getReports, sendReport, discardReport,approveTask } = require("../controllers/chefController.js");


router.get("/getreports", getReports);
router.patch("/sendreport", sendReport);
router.patch("/", discardReport);
router.get("/getusers", getUsers);
router.patch("/approvetask", approveTask);

// Export the router
module.exports = router;