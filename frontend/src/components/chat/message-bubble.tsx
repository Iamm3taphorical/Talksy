'use client';

import { useChatStore, Message } from '@/store/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MessageBubble({ message }: { message: Message }) {
  const { currentUser, activeChat } = useChatStore();
  const isMe = message.senderId === currentUser?.id;
  const isAi = message.type === 'ai';

  if (!currentUser || !activeChat) return null;

  return (
    <div className={`flex w-full mt-2 space-x-3 max-w-sm sm:max-w-md md:max-w-lg ${isMe ? 'ml-auto justify-end' : ''}`}>
      {!isMe && (
        <Avatar className="w-8 h-8 flex-shrink-0 mt-auto mb-1 border border-neutral-800">
          <AvatarImage 
            src={isAi ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop' : activeChat.avatar} 
          />
          <AvatarFallback className="bg-neutral-800 text-[10px]">
             {isAi ? 'AI' : activeChat.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        <div 
          className={`px-4 py-2.5 rounded-2xl ${
            isMe 
              ? 'bg-blue-600 text-white rounded-br-sm' 
              : isAi 
                ? 'bg-neutral-800 text-neutral-100 rounded-bl-sm border border-neutral-700/50' 
                : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-sm'
          }`}
        >
          <p className="text-[15px] leading-relaxed break-words">{message.content}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-[11px] text-neutral-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isMe && message.status && (
            <span className="text-[11px] text-neutral-500">• {message.status}</span>
          )}
        </div>
      </div>
    </div>
  );
}
