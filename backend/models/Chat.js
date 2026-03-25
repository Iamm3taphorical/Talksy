const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  type: { type: String, enum: ['private', 'group'], default: 'private' },
  name: { type: String }, // For groups
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
