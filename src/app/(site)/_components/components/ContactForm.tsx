"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-mono text-[#ccd6f6] mb-1.5">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-[#233554] bg-[#0a192f] px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 outline-none focus:border-[#64ffda] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-mono text-[#ccd6f6] mb-1.5">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-[#233554] bg-[#0a192f] px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 outline-none focus:border-[#64ffda] transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-mono text-[#ccd6f6] mb-1.5">Subject</label>
        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="What's this about?"
          className="w-full rounded-xl border border-[#233554] bg-[#0a192f] px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 outline-none focus:border-[#64ffda] transition"
        />
      </div>
      <div>
        <label className="block text-sm font-mono text-[#ccd6f6] mb-1.5">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project or inquiry..."
          className="w-full rounded-xl border border-[#233554] bg-[#0a192f] px-4 py-3 text-sm text-[#ccd6f6] placeholder-[#8892b0]/50 outline-none focus:border-[#64ffda] transition resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full border border-[#64ffda] text-[#64ffda] font-mono hover:bg-[#64ffda]/10 font-semibold py-3 rounded-xl transition disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400 text-center font-medium">
          ✓ Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 text-center font-medium">✗ Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
