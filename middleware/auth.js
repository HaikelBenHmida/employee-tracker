const Employee = require('../models/employee');

function auth(req, res, next) {
    if (!req.session.employee) {
        return res.redirect('/employee/login');
    }

    Employee.findById(req.session.employee._id, function(err, employee) {
        if (err) {
            console.error(err);
            return res.render('error', { message: 'Error authenticating employee', error: err });
        }

        if (!employee) {
            return res.redirect('/employee/login');
        }

        req.user = employee;
        next();
    });
}

module.exports = auth;
