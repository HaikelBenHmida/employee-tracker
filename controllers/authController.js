// File: controllers/authController.js

export function getAdminLogin(req, res) {
    res.render('admin-login', {
      title: 'Admin Login',
      message: req.flash('error')
    });
  }