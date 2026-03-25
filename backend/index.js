require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chats');

// Models
const User = require('./models/User');
const Chat = require('./models/Chat');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talksy';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API ROUTES ---

// Health check
app.get('/', (req, res) => res.send('Talksy API is running'));

// Auth routes
app.use('/auth', authRoutes);

// Chat routes
app.use('/chats', chatRoutes);

// AI Chat Endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured. Please set it in .env' });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    if (data.error) {
       return res.status(400).json({ error: data.error.message });
    }
    
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Failed to communicate with AI' });
  }
});


// --- WEBSOCKETS ---

io.on('connection', (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    io.emit('presence', { userId, status: 'online' });
  });

  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`);
  });

  socket.on('send_message', async (data) => {
    const { chatId, senderId, content, type } = data;
    
    try {
      const payload = {
        id: Date.now().toString(),
        chatId,
        senderId,
        content,
        type: type || 'text',
        timestamp: new Date().toISOString(),
        status: 'delivered'
      };

      io.to(`chat_${chatId}`).emit('receive_message', payload);
    } catch (err) {
      console.error('Message Error:', err);
    }
  });

  socket.on('typing', (data) => {
    const { chatId, senderId, isTyping } = data;
    socket.to(`chat_${chatId}`).emit('typing_indicator', { senderId, isTyping });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Talksy server running on port ${PORT}`);
});
