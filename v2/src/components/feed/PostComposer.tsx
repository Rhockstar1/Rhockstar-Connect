"use client";

import { useState } from "react";
import { Image as ImageIcon, Video, Paperclip, Send } from "lucide-react";

export default function PostComposer() {
  const [content, setContent] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // Here we would typically submit to Firebase
    console.log("Posting:", content);
    setContent("");
  };

  return (
    <div className="neo-card p-6 mb-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-2xl" />
      
      <form onSubmit={handlePost}>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-purple flex-shrink-0 flex items-center justify-center font-bold text-white shadow-inner">
            EP
          </div>
          <div className="flex-1">
            <textarea
              className="neo-input w-full min-h-[100px] resize-none bg-slate-900/40 text-lg placeholder:text-slate-500"
              placeholder="What's on your mind, Elijah?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pl-16">
          <div className="flex gap-3">
            <button type="button" className="w-10 h-10 rounded-full neo-card bg-slate-800/40 flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand/30 transition-all group">
              <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button type="button" className="w-10 h-10 rounded-full neo-card bg-slate-800/40 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple/30 transition-all group">
              <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button type="button" className="w-10 h-10 rounded-full neo-card bg-slate-800/40 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all group">
              <Paperclip className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="neo-button-primary !w-auto px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Post</span>
            <Send className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
}
