// File: routes/record.js

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/authController');
const {
  addRecord,
  editRecord,
  updateRecord,
  deleteRecord,
  viewRecords,
  viewStats,
  viewMonthStats,
} = require('../controllers/employeeController');

// Add record
router.post('/add-record', authenticateUser, addRecord);

// Edit record
router.get('/edit-record/:id', authenticateUser, editRecord);

// Update record
router.put('/update-record/:id', authenticateUser, updateRecord);

// Delete record
router.delete('/delete-record/:id', authenticateUser, deleteRecord);

// View records
router.get('/view-records', authenticateUser, viewRecords);

// View stats
router.get('/view-stats', authenticateUser, authenticateAdmin, viewStats);

// View month stats
router.get('/view-month-stats', authenticateUser, authenticateAdmin, viewMonthStats);

module.exports = router;
