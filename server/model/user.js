const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId:{type:String,unique:true},
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  tokens:{type:Number,default:0},
  messId: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredMess' },
});


module.exports = mongoose.model('User', UserSchema);
