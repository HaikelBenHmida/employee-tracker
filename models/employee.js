const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

employeeSchema.pre('save', function(next) {
    const employee = this;

    if (!employee.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(employee.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            employee.password = hash;
            next();
        });
    });
});

employeeSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Employee', employeeSchema);
