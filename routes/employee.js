const express = require('express');
const router = express.Router();
const moment = require('moment');
const Employee = require('../models/employee');
const Record = require('../models/record');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, async function(req, res) {
    try {
        const employee = await Employee.findById(req.user._id);
        const records = await Record.find({ employee: employee._id }).sort({ start: -1 });
        res.render('employee-dashboard', { title: 'Employee Dashboard', employee, records });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching employee records', error: err });
    }
});

router.get('/login', function(req, res) {
    res.render('employee-login', { title: 'Employee Login' });
});

router.post('/login', async function(req, res) {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.render('login-failed', { title: 'Login Failed' });
        }

        employee.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.error(err);
                return res.render('error', { message: 'Error comparing passwords', error: err });
            }

            if (!isMatch) {
                return res.render('login-failed', { title: 'Login Failed' });
            }

            req.session.employee = employee;
            res.redirect('/employee/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error logging in', error: err });
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
            res.render('error', { message: 'Error logging out', error: err });
        }

        res.redirect('/');
    });
});

module.exports = router;
