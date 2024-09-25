const mongoose = require('mongoose');

const messStatusSchema = new mongoose.Schema({
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },

});

module.exports = mongoose.model('messStatus', messStatusSchema, 'messStatus');