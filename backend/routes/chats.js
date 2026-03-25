const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const router = express.Router();

// GET /chats/:userId - Get all chats for a user
router.get('/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.params.userId })
      .populate('members', 'name avatar status')
      .sort({ updatedAt: -1 });
    res.json({ chats });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats.' });
  }
});

// POST /chats - Create a new chat
router.post('/', async (req, res) => {
  try {
    const { type, name, members } = req.body;
    const chat = await Chat.create({ type, name, members });
    res.status(201).json({ chat });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create chat.' });
  }
});

// GET /chats/:chatId/messages - Get messages for a chat
router.get('/:chatId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .sort({ createdAt: 1 })
      .limit(100);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

module.exports = router;
