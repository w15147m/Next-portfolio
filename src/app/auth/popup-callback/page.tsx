"use client";

import { useEffect } from "react";

export default function PopupCallbackPage() {
  useEffect(() => {
    try {
      if (window.opener) {
        window.opener.postMessage({ type: "GITHUB_AUTH_SUCCESS" }, "*");
        setTimeout(() => {
          window.close();
        }, 300);
      } else {
        window.location.href = "/admin";
      }
    } catch {
      window.location.href = "/admin";
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#091515] text-white font-sans">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-teal-400 border-t-transparent"></div>
        <p className="text-sm text-teal-100 font-medium">Connecting GitHub account...</p>
      </div>
    </div>
  );
}
