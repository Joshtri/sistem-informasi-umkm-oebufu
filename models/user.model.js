import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    maxlength: 50,
    required: true
  },
  nama_lengkap: {
    type: String,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;