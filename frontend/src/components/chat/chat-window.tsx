'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './message-bubble';
import { InputBox } from './input-box';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatWindow() {
  const { activeChat, messages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter messages for active chat
  const chatMessages = messages.filter(m => m.chatId === activeChat?.id);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, activeChat]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black text-neutral-500">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-800 shadow-sm">
            <svg className="w-8 h-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-neutral-300">Select a connection</h3>
          <p className="max-w-xs mt-2 text-sm leading-relaxed">Choose an existing conversation or start a new one to begin messaging.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 text-white relative h-full w-full">
      {/* Chat Header */}
      <div className="h-16 border-b border-neutral-800 bg-black/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 w-full">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 border border-neutral-800 shadow-sm">
            <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
            <AvatarFallback className="bg-neutral-800 text-neutral-300">
              {activeChat.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold tracking-tight leading-tight">{activeChat.name}</h2>
            <p className="text-xs text-neutral-400 capitalize flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-sm shadow-green-900"></span>
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full hidden sm:flex">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white rounded-full">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages View */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4 sm:p-6 w-full relative">
        <div className="flex flex-col space-y-4 max-w-4xl mx-auto pb-4">
          <div className="flex justify-center mb-6 mt-4">
            <span className="text-xs text-neutral-500 bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800">
              Today
            </span>
          </div>
          {chatMessages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="w-full relative z-20">
        <InputBox />
      </div>
    </div>
  );
}
