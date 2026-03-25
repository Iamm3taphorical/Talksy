import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat | Talksy',
  description: 'Real-time AI Chat Dashboard',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full relative bg-black text-white overflow-hidden selection:bg-indigo-500/30">
      {children}
    </div>
  );
}
