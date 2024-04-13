const express = require("express");
const router = express.Router();
const { getUsers, getReports, sendReport, discardReport } = require("../controllers/chefController.js");


router.get("/", getReports);
router.patch("/sendreport", sendReport);
router.patch("/", discardReport);
router.get("/getusers", getUsers);

// Export the router
module.exports = router;