import { create } from 'zustand';

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'ai';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
};

export type Chat = {
  id: string;
  name: string;
  type: 'private' | 'group';
  members: User[];
  lastMessage?: string;
  unreadCount: number;
  avatar?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
};

interface ChatState {
  currentUser: User | null;
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  isAiPanelOpen: boolean;
  setCurrentUser: (user: User) => void;
  setActiveChat: (chat: Chat) => void;
  setChats: (chats: Chat[]) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  toggleAiPanel: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentUser: {
    id: 'user_1',
    name: 'Mahir',
    email: 'mahir@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    status: 'online',
  },
  chats: [
    {
      id: 'chat_1',
      name: 'Alice Cooper',
      type: 'private',
      members: [],
      lastMessage: 'Hey, are we still on for tomorrow?',
      unreadCount: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      id: 'chat_2',
      name: 'Project Alpha Team',
      type: 'group',
      members: [],
      lastMessage: 'I just uploaded the new design files.',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    },
    {
      id: 'chat_3',
      name: 'Talksy AI',
      type: 'private',
      members: [],
      lastMessage: 'I am here to assist you!',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop',
    },
    {
      id: 'chat_4',
      name: 'David Chen',
      type: 'private',
      members: [],
      lastMessage: 'Sent you the invoice.',
      unreadCount: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 'chat_5',
      name: 'Design Crew 🎨',
      type: 'group',
      members: [],
      lastMessage: 'The new palette looks amazing!',
      unreadCount: 5,
      avatar: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
    },
  ],
  activeChat: null,
  messages: [
    // Chat 1 messages
    {
      id: 'msg_1',
      chatId: 'chat_1',
      senderId: 'user_2',
      content: 'Hey Mahir! How have you been?',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'read',
    },
    {
      id: 'msg_2',
      chatId: 'chat_1',
      senderId: 'user_1',
      content: "Hey! I'm doing great, thanks for asking 😊",
      type: 'text',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      status: 'read',
    },
    {
      id: 'msg_3',
      chatId: 'chat_1',
      senderId: 'user_2',
      content: 'Hey, are we still on for tomorrow?',
      type: 'text',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'delivered',
    },
    // Chat 2 messages
    {
      id: 'msg_4',
      chatId: 'chat_2',
      senderId: 'user_3',
      content: 'Team meeting at 3 PM today.',
      type: 'text',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'read',
    },
    {
      id: 'msg_5',
      chatId: 'chat_2',
      senderId: 'user_1',
      content: "Got it, I'll be there!",
      type: 'text',
      timestamp: new Date(Date.now() - 7000000).toISOString(),
      status: 'read',
    },
    {
      id: 'msg_6',
      chatId: 'chat_2',
      senderId: 'user_4',
      content: 'I just uploaded the new design files.',
      type: 'text',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'delivered',
    },
    // Chat 3 messages (AI)
    {
      id: 'msg_7',
      chatId: 'chat_3',
      senderId: 'ai_assistant',
      content: '👋 Welcome to Talksy AI! I can help you draft replies, summarize conversations, translate messages, and much more. Just type your question!',
      type: 'ai',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'read',
    },
    // Chat 4 messages
    {
      id: 'msg_8',
      chatId: 'chat_4',
      senderId: 'user_5',
      content: 'Sent you the invoice. Check your email.',
      type: 'text',
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      status: 'delivered',
    },
  ],
  isAiPanelOpen: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setActiveChat: (chat) => set({ activeChat: chat }),
  setChats: (chats) => set({ chats }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  toggleAiPanel: () => set((state) => ({ isAiPanelOpen: !state.isAiPanelOpen })),
}));
