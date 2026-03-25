const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Or String for 'ai_assistant'
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'ai'], default: 'text' },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
