'use client';

import { useChatStore } from '@/store/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical, Edit } from 'lucide-react';

export function Sidebar() {
  const { chats, activeChat, setActiveChat } = useChatStore();

  return (
    <div className="w-80 border-r border-neutral-800 bg-black/95 flex flex-col h-full text-white">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight">Chats</h2>
        <div className="flex gap-3 text-neutral-400">
          <Edit className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <MoreVertical className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input 
            placeholder="Search messages..." 
            className="pl-9 bg-neutral-900 border-none rounded-full focus-visible:ring-1 focus-visible:ring-neutral-700 text-sm h-10 placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 pb-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                activeChat?.id === chat.id 
                  ? 'bg-neutral-800' 
                  : 'hover:bg-neutral-900'
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-transparent">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback className="bg-neutral-800 text-neutral-400">
                    {chat.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {chat.type === 'private' && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-[15px] truncate pr-2">{chat.name}</h3>
                  <span className="text-xs text-neutral-500 flex-shrink-0">12:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-neutral-400 truncate pr-2">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-blue-600 text-[10px] font-bold rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
