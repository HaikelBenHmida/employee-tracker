const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const employeeRouter = require('./routes/employee');

const app = express();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/employee-tracker');

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);

// Error handling
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.error(err);

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;

