'use client';

import { Sidebar } from '@/components/chat/sidebar';
import { ChatWindow } from '@/components/chat/chat-window';
import { AiPanel } from '@/components/chat/ai-panel';

export default function ChatPage() {
  return (
    <div className="flex w-full h-full bg-black overflow-hidden font-sans">
      {/* Sidebar - Hidden on typical mobile screens, shown on md+ */}
      <div className="hidden md:flex flex-shrink-0 border-r border-neutral-800">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex min-w-0 h-full relative">
        <ChatWindow />
      </div>

      {/* AI Assistant Panel - Right Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <AiPanel />
      </div>
    </div>
  );
}
