// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load Passport configuration
require('./config/passport')(passport);

// Define routes
app.use('/auth', require('./routes/auth'));
app.use('/records', require('./routes/records'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/attendance-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
