// File: controllers/employeeController.js

const Employee = require('../models/Employee');

// Function to get all employee records
async function getEmployeeRecords() {
  try {
    const records = await Employee.find().sort({ date: 'desc' }).lean();
    return records;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Function to add a new employee record
async function addEmployeeRecord(recordData) {
  try {
    const record = new Employee(recordData);
    await record.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Function to get an employee record by ID
async function getEmployeeRecordById(recordId) {
  try {
    const record = await Employee.findById(recordId).lean();
    return record;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Function to update an employee record
async function updateEmployeeRecord(recordId, recordData) {
  try {
    await Employee.findByIdAndUpdate(recordId, recordData);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Function to delete an employee record
async function deleteEmployeeRecord(recordId) {
  try {
    await Employee.findByIdAndDelete(recordId);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  getEmployeeRecords,
  addEmployeeRecord,
  getEmployeeRecordById,
  updateEmployeeRecord,
  deleteEmployeeRecord
};
