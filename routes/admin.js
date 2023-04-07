const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Record = require('../models/record');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/dashboard', auth, adminAuth, async function(req, res) {
    try {
        const employees = await Employee.find();
        res.render('admin-dashboard', { title: 'Admin Dashboard', employees });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching employees', error: err });
    }
});

router.get('/add-employee', auth, adminAuth, function(req, res) {
    res.render('add-employee', { title: 'Add Employee' });
});

router.post('/add-employee', auth, adminAuth, async function(req, res) {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error creating employee', error: err });
    }
});

router.get('/edit-employee/:id', auth, adminAuth, async function(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('edit-employee', { title: 'Edit Employee', employee });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching employee', error: err });
    }
});

router.post('/edit-employee/:id', auth, adminAuth, async function(req, res) {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error updating employee', error: err });
    }
});

router.post('/delete-employee/:id', auth, adminAuth, async function(req, res) {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        const records = await Record.deleteMany({ employee: employee._id });
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error deleting employee', error: err });
    }
});

router.get('/view-records/:id', auth, adminAuth, async function(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        const records = await Record.find({ employee: employee._id }).sort({ start: -1 });
        res.render('view-records', { title: 'View Records', employee, records });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching records', error: err });
    }
});

module.exports = router;
