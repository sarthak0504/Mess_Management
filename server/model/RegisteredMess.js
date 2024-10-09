const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisteredMessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  messId: {
    type: String,
    required: true,
    unique: true
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  managerId: {
    type: String,  // Update this field to be a string
    required: true,
    unique: true
  },

});

module.exports = mongoose.model('RegisteredMess', RegisteredMessSchema);
