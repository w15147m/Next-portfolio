"use client";

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import type { GithubData } from '@/lib/github';
import { showToast } from '@/components/common/CustomToaster';

export default function ActivityTimelineWidget({ github }: { github?: GithubData }) {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "GITHUB_AUTH_SUCCESS") {
        showToast("GitHub account connected successfully!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleConnectGithub = async () => {
    if (!github?.isConfigured) {
      showToast("GitHub App not configured! Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your .env file.", "error");
      return;
    }

    try {
      setIsConnecting(true);
      const res: any = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/auth/popup-callback",
        disableRedirect: true,
      });

      if (res?.data?.url) {
        const width = 600;
        const height = 750;
        const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
        const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);

        const popup = window.open(
          res.data.url,
          "github_oauth_popup",
          `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
        );

        // Fallback check if popup was closed
        const timer = setInterval(() => {
          if (!popup || popup.closed) {
            clearInterval(timer);
            setIsConnecting(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }, 1000);
      } else if (res?.error) {
        showToast(res.error.message || "Failed to initiate GitHub OAuth. Check GITHUB_CLIENT_ID in .env", "error");
        setIsConnecting(false);
      } else {
        // Fallback direct redirect if popup URL not returned
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/admin",
        });
      }
    } catch (err: any) {
      console.error("GitHub connect error:", err);
      showToast("Please check that GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET are configured in your .env file.", "error");
      setIsConnecting(false);
    }
  };

  const isConnected = github?.isConnected;
  const events = github?.events || [];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#091515] border border-gray-200 dark:border-[#163533] p-5 h-full flex flex-col shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-teal-100 tracking-wide">Activity Timeline</h3>
          {isConnected && github?.username && (
            <span className="text-[10px] bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded border border-teal-200 dark:border-teal-500/30">
              @{github.username}
            </span>
          )}
        </div>
        <span className="text-gray-400 dark:text-teal-600 font-bold tracking-widest">...</span>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#061011] border border-gray-200 dark:border-[#163533] flex items-center justify-center text-gray-700 dark:text-teal-400 mb-2.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
          <p className="text-xs text-gray-600 dark:text-teal-50/70 mb-3 max-w-[200px]">
            Connect your GitHub account to sync live commit & activity timeline.
          </p>
          <button
            onClick={handleConnectGithub}
            disabled={isConnecting}
            className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-gray-950 font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {isConnecting ? (
              <span>Connecting...</span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Connect GitHub</span>
              </>
            )}
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-3 text-gray-500 dark:text-teal-600 text-xs">
          No recent GitHub events found.
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-5 relative ml-3 mt-1 overflow-y-auto pr-1">
          <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gray-200 dark:bg-[#163533]"></div>
          
          {events.map((evt, idx) => (
            <div key={evt.id} className="relative pl-6">
              <div 
                className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${
                  idx === 0 
                    ? 'bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.5)] dark:shadow-[0_0_8px_rgba(45,212,191,0.8)]' 
                    : 'border-2 border-gray-300 dark:border-[#163533] bg-white dark:bg-[#091515]'
                }`}
              />
              <h4 className={`text-xs font-semibold mb-0.5 truncate ${idx === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-teal-50/80'}`}>
                {evt.title}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-teal-600 truncate">
                {evt.subtitle} • {evt.timeAgo}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
