const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    MessName:{type:String,},
    tokensAccepeted:[{typr:Number}],
    phoneNo:{type:Number,required:true},
    password:{type:String,required:true},
    userIds:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Manager', managerSchema, 'manager');