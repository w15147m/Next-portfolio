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
    return null;
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">Recent Messages</h3>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1">
        {messages.map((msg) => {
          const diffMinutes = Math.floor((new Date().getTime() - new Date(msg.createdAt).getTime()) / 60000);
          const timeStr = diffMinutes < 60 ? `${diffMinutes || 1} min ago` : new Date(msg.createdAt).toLocaleDateString();
          
          return (
            <div key={msg.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-[#061011]/50 border border-gray-100 dark:border-[#163533]/40 group hover:border-teal-400/30 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${msg.isRead ? 'bg-gray-100 dark:bg-[#122e2b] text-gray-500 dark:text-teal-700' : 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30'}`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold truncate ${msg.isRead ? 'text-gray-500 dark:text-teal-50/70' : 'text-gray-900 dark:text-white'}`}>
                    {msg.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-teal-600 truncate">
                    {msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end justify-center ml-2">
                <span className="text-[10px] text-gray-400 dark:text-teal-600 mb-1">{timeStr}</span>
                {!msg.isRead && (
                  <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.5)] dark:shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
