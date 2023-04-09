// File: controllers/employeeController.js

import Employee, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Employee';

// Function to get all employee records
async function getEmployeeRecords() {
  try {
    const records = await find().sort({ date: 'desc' }).lean();
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
    const record = await findById(recordId).lean();
    return record;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Function to update an employee record
async function updateEmployeeRecord(recordId, recordData) {
  try {
    await findByIdAndUpdate(recordId, recordData);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Function to delete an employee record
async function deleteEmployeeRecord(recordId) {
  try {
    await findByIdAndDelete(recordId);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default {
  getEmployeeRecords,
  addEmployeeRecord,
  getEmployeeRecordById,
  updateEmployeeRecord,
  deleteEmployeeRecord
};
