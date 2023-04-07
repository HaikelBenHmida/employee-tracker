function adminAuth(req, res, next) {
    if (req.user.isAdmin) {
        return next();
    }

    res.redirect('/');
}

module.exports = adminAuth;
