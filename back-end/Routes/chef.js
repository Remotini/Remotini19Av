const express = require("express");
const router = express.Router();
const { getUsers, getReports, sendReport, discardReport,statusTask } = require("../controllers/chefController.js");


router.get("/getreports", getReports);
router.patch("/sendreport", sendReport);
router.patch("/", discardReport);
router.get("/getusers", getUsers);
router.patch("/changeStatusTask", statusTask);

// Export the router
module.exports = router;