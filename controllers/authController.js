// File: controllers/authController.js

const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with the same email already exists' });
    }
    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (error, user, info) => {
    try {
      if (error || !user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  })(req, res, next);
};

// File: controllers/authController.js

// Display login page
exports.getLogin = (req, res) => {
  res.render('login', { message: req.flash('error') });
};


// Authenticate user as admin
exports.authenticateAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
