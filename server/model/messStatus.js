const mongoose = require('mongoose');

const messStatusSchema = new mongoose.Schema({
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
    openStatus:{type:Boolean,default:false},
    date:{type:Date},
    time:{type:String,enum:["breakfast","lunch","dinner"]},
    food:[{type:String}]
});

module.exports = mongoose.model('messStatus', messStatusSchema, 'messStatus');