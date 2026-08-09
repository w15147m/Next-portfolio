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
      <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[300px]">
        <svg className="w-12 h-12 text-neutral-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        No recent messages.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white tracking-tight">Recent Messages</h3>
        <span className="bg-brand-500/10 text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full border border-brand-500/20">
          {messages.filter(m => !m.isRead).length} New
        </span>
      </div>
      
      <div className="divide-y divide-neutral-800 flex-1 overflow-y-auto max-h-[400px] xl:max-h-none">
        {messages.map((msg) => (
          <Link 
            key={msg.id} 
            href="/admin/messages"
            className="block p-5 hover:bg-white/5 transition-colors group relative"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${msg.isRead ? 'bg-neutral-800 text-neutral-400' : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'}`}>
                  {msg.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`text-sm font-semibold truncate ${msg.isRead ? 'text-gray-400' : 'text-white'}`}>
                    {msg.name}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-1">
                  {msg.email}
                </p>
                <p className={`text-sm line-clamp-2 ${msg.isRead ? 'text-gray-500' : 'text-gray-300'}`}>
                  {msg.message}
                </p>
              </div>
              {!msg.isRead && (
                <div className="absolute top-1/2 -translate-y-1/2 right-5 shrink-0 w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(100,255,218,0.8)]" />
              )}
            </div>
          </Link>
        ))}
      </div>
      
      <div className="p-4 border-t border-neutral-800 bg-[#050505] mt-auto">
        <Link 
          href="/admin/messages" 
          className="text-sm text-brand-400 hover:text-brand-300 font-medium flex items-center justify-center gap-2"
        >
          View All Messages
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
