const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const homeRouter = require('./routes/home');
const adminRouter = require('./routes/admin');
const employeeRouter = require('./routes/employee');

const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to database
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/employee-tracker');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee-attendance-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


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

