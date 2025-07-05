import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, unique: true, sparse: true },
  role: {
    type: String,
    enum: ['pregnant_woman', 'provider', 'admin'],
    default: 'pregnant_woman',
  },
  password: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;

