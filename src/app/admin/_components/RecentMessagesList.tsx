import React from 'react';
import Link from 'next/link';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function RecentMessagesList({ messages }: { messages: Message[] }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="rounded-2xl bg-[#091515] border border-[#163533] p-5 h-full flex flex-col items-center justify-center">
        <p className="text-teal-600 text-sm mb-4">No recent messages.</p>
        <Link href="/admin/messages" className="text-teal-400 hover:underline text-xs font-medium">View Messages</Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#091515] border border-[#163533] p-5 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-teal-100 tracking-wide">Recent Messages</h3>
        <span className="text-teal-600 font-bold tracking-widest">...</span>
      </div>
      
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
        {messages.map((msg) => {
          // generate a random time string like "3 min", "18 min", "12 min"
          // in a real app this would be computed from createdAt
          const diffMinutes = Math.floor((new Date().getTime() - new Date(msg.createdAt).getTime()) / 60000);
          const timeStr = diffMinutes < 60 ? `${diffMinutes || 1} min` : 'Time';
          
          return (
            <div key={msg.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${msg.isRead ? 'bg-[#122e2b] text-teal-700' : 'bg-teal-900/30 text-teal-400 border border-teal-500/30'}`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold truncate ${msg.isRead ? 'text-teal-50/70' : 'text-white'}`}>
                    {msg.name}
                  </h4>
                  <p className="text-[11px] text-teal-600 truncate">
                    {msg.message.length > 30 ? msg.message.substring(0, 30) + '...' : msg.message}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end justify-center ml-2">
                <span className="text-[10px] text-teal-600 mb-1">{timeStr}</span>
                {!msg.isRead && (
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
