const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  status: { type: String, enum: ['online', 'offline', 'away'], default: 'offline' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
