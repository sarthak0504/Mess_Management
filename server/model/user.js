const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  tokens:{type:Number},
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  feedbackId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback'}
});


module.exports = mongoose.model('User', UserSchema);
