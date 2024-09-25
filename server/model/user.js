const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  studentDetails: {
    studentId: { type: String },
    department: { type: String },
    year: { type: String }
  },
  facultyDetails: {
    facultyId: { type: String },
    facultyDept: { type: String },
    designation: { type: String }
  },
  managerDetails: {
    managerId: { type: String },
    shift: { type: String },
    experience: { type: String }
  },
  staffDetails: {
    staffId: { type: String },
    jobTitle: { type: String },
    staffShift: { type: String }
  }
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

module.exports = mongoose.model('User', UserSchema);
