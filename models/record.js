const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    start: { type: Date, required: true },
    end: { type: Date }
});

module.exports = mongoose.model('Record', recordSchema);
