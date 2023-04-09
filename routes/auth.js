// File: routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Login page
router.get('/login', authController.getLogin);

// Login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
