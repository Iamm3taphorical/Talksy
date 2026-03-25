'use client';

import { useChatStore } from '@/store/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Sparkles, Bot, Zap } from 'lucide-react';
import { useState } from 'react';

export function AiPanel() {
  const { isAiPanelOpen, toggleAiPanel, addMessage, activeChat, currentUser } = useChatStore();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAiPanelOpen) return null;

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !activeChat || !currentUser) return;

    // Add user message to AI
    const userMsgId = Date.now().toString();
    // Simulate AI thinking and response
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await response.json();
      
      addMessage({
        id: (Date.now() + 1).toString(),
        chatId: activeChat.id,
        senderId: 'ai_assistant',
        content: data.reply || data.error || 'Failed to get a response.',
        type: 'ai',
        timestamp: new Date().toISOString(),
        status: 'delivered',
      });
    } catch (err) {
      addMessage({
        id: (Date.now() + 1).toString(),
        chatId: activeChat.id,
        senderId: 'ai_assistant',
        content: 'Error connecting to AI service.',
        type: 'ai',
        timestamp: new Date().toISOString(),
        status: 'delivered',
      });
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="w-80 border-l border-neutral-800 bg-neutral-950 flex flex-col h-full text-white">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-indigo-950/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600/20 rounded-lg">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-indigo-100">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleAiPanel} className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Suggested Actions */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Suggested actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-white rounded-xl h-auto py-3 whitespace-normal text-left">
                <Sparkles className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
                Summarize this conversation
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:text-white rounded-xl h-auto py-3 whitespace-normal text-left">
                <Zap className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                Translate last message to Spanish
              </Button>
            </div>
          </div>

          <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Bot className="w-16 h-16" />
            </div>
            <h3 className="font-medium text-indigo-300 mb-1 relative z-10">Talksy AI</h3>
            <p className="text-xs text-indigo-200/70 relative z-10">
              I can help you draft replies, summarize long chats, or answer questions without leaving the app.
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* AI Input */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-950">
        <form onSubmit={handleAskAi} className="relative">
          <Input 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI anything..." 
            className="w-full bg-neutral-900 border-neutral-700 rounded-xl pl-4 pr-10 py-5 text-sm focus-visible:ring-1 focus-visible:ring-indigo-500 text-white placeholder:text-neutral-500"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost"
            disabled={loading || !prompt.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 disabled:opacity-50"
          >
            {loading ? <span className="loader w-4 h-4" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
