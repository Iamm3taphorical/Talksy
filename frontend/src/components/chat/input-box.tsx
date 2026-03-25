'use client';

import { useState } from 'react';
import { useChatStore } from '@/store/chat';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, Zap } from 'lucide-react';

export function InputBox() {
  const [text, setText] = useState('');
  const { addMessage, currentUser, activeChat, toggleAiPanel } = useChatStore();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !currentUser || !activeChat) return;

    addMessage({
      id: Date.now().toString(),
      chatId: activeChat.id,
      senderId: currentUser.id,
      content: text,
      type: 'text',
      timestamp: new Date().toISOString(),
      status: 'sent',
    });
    
    setText('');
  };

  return (
    <div className="p-4 border-t border-neutral-800 bg-black">
      <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-end gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 flex-shrink-0"
          title="Add attachment"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="relative flex-1">
          <Input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..." 
            className="w-full bg-neutral-900 border-neutral-700 rounded-2xl pl-4 pr-10 py-6 min-h-[50px] text-[15px] focus-visible:ring-1 focus-visible:ring-neutral-600 focus-visible:border-neutral-500 text-white placeholder:text-neutral-500"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <Smile className="w-5 h-5" />
          </Button>
        </div>

        {text.trim() ? (
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0 h-12 w-12 transition-transform active:scale-95"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </Button>
        ) : (
          <Button 
            type="button" 
            size="icon" 
            onClick={toggleAiPanel}
            className="rounded-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 flex-shrink-0 h-12 w-12 transition-colors border border-indigo-500/30"
            title="Ask AI"
          >
            <Zap className="w-5 h-5" />
          </Button>
        )}
      </form>
    </div>
  );
}
