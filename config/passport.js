// File: config/passport.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Find user by email
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect email or password' });
          }
        });
      })
      .catch(err => done(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
