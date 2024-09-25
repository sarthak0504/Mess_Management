const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    MessName:{type:String,},
    tokensAccepeted:[{typr:Number}],
    phoneNo:{type:Number,required:true},
    password:{type:String,required:true}
});

module.exports = mongoose.model('Manager', managerSchema, 'manager');