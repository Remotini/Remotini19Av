const mongoose = require("mongoose");
const User = require("../models/userModel");
const Corbeille =require("../models/corbeilleModel");

/**
 * GET /users - Get all users by id of chef.
 */
const getUsers = async (req, res) => {
  try {
    const { chefId } = req.query;

    // Find the chef by id
    const chef = await User.findById(chefId).populate("employee");
    if (!chef) {
      return res.status(404).json({ msg: "Chef Not Found" });
    }

    // Populate the 'employee' field of the chef
    const populatedChef = await User.populate(chef, {
      path: "employee",
    });

    // Extract the employees of the chef
    const employees = populatedChef.employee;

    const ids = employees.map((emp) => emp._id);

    const users = await User.find({ _id: { $in: ids } });
    users.forEach((user) => {
      user.password = undefined;
    });

    res.json(users);

    
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
  
};


/**
 * GET /rapports - Get all rapports by id of user and rapport.
 */
const getReports = async (req, res) => {
  try {
    const { chefId,employeeId } = req.query;
    

    // Find the chef by id
    const chef = await User.findById(chefId).populate("employee");
    if (!chef) {
      return res.status(404).json({ msg: "Chef Not Found" });
    }

    // Find the specified employee within the chef's employees array by id
    const employee = chef.employee.find((emp) => emp._id == employeeId);
    if (!employee) {
      return res.status(404).json({ msg: "Employee Not Found" });
    }

    // Populate the 'workersReports' field of the specified employee
    const populatedEmployee = await User.populate(employee, {
      path: "workersReports",
    });

    // Extract the reports of the specified employee
    const employeeReports = populatedEmployee.workersReports;

    res.json(employeeReports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

//   Send Rapport to Chef
const sendReport = async (req, res) => {
  try {
    const { chefId } = req.query;
    const { userId, rapportId } = req.body;

    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found!" });
    }
    console.log("ok");
    // Find the employee (sender) by id in the chef's employees array
    const employeeIndex = chef.employee.findIndex((emp) => emp._id == userId);
    if (employeeIndex === -1) {
      return res.status(404).json(userId);
    }
    console.log(chef.employee[employeeIndex].workersReports);

    // Push the rapportId to the employee's workersReports array
    chef.employee[employeeIndex].workersReports.push(rapportId);
    await chef.save();

    res.json({ message: "Rapport added to employee successfully" });
  } catch (error) {
    console.error("Error adding rapport to employee:", error);
    res.status(500).json({ error: "Failed to add rapport to employee" });
  }
};

// Chef deletes report but still has it in collection retrieval

const discardReport = async (req, res) => {
  try {
    const { chefId } = req.query;
    const { rapportId, userId } = req.body;

    // Check if chefId and reportId are provided
    if (!chefId || !rapportId) {
      return res.sendStatus(400);
    }

    // Find the chef by id
    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found!" });
    }

    // Find the employee's index in the chef's employees array
    const employeeIndex = chef.employee.findIndex((emp) =>
      emp.workersReports.includes(rapportId)
    );
    if (employeeIndex === -1) {
      return res
        .status(404)
        .json({ message: "Report not found for this chef!" });
    }

    // Remove the reportId from the employee's workersReports array
    chef.employee[employeeIndex].workersReports = chef.employee[
      employeeIndex
    ].workersReports.filter((id) => id != rapportId);
    await chef.save();

    // Create a Corbeille document and save the discarded report ID
    const corbeilleItem = new Corbeille({ rapportId, userId });

    await corbeilleItem.save();

    res.json({ message: "Report discarded successfully" });
  } catch (error) {
    console.error("Error discarding report:", error);
    res.status(500).json({ error: "Failed to discard report" });
  }
};

module.exports = { getUsers, getReports, sendReport, discardReport };
