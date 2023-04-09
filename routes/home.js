// File: routes/home.js

const express = require('express');
const router = express.Router();

const { getEmployeeRecords } = require('../controllers/employeeController').default;

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Get the employee records
  const records = await getEmployeeRecords();

  // Render the home page with the records
  res.render('home', { title: 'Employee Attendance Tracker', records });
});

module.exports = router;
