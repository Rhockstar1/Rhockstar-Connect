"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  Heart,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { getAIResponse } from "@/lib/services/ai";
import type { AIPersona, AIMessage } from "@/lib/services/ai";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<AIPersona>("career");

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "Hi! I'm Gemini, your Rhockstar Connect AI Assistant. How can I help you level up your career today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 50);
    }
  }, [messages, isTyping, isOpen]);

  const handlePersonaChange = (newPersona: AIPersona) => {
    setPersona(newPersona);

    setMessages([
      {
        id: Date.now().toString(),
        role: "ai",
        content:
          newPersona === "career"
            ? "Switched to Career Coach! Need help with your resume, interview prep, or job hunt?"
            : "Switched to Dating Wingman! Need advice on your profile, openers, or date ideas?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || isTyping) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const responseContent = await getAIResponse(
        persona,
        userMsg.content
      );

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: responseContent,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Rhockstar AI error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content:
            "Sorry, I couldn't connect to the AI service right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* ================================
          FLOATING AI BUTTON
      ================================= */}

      {!isOpen && (
        <button
          type="button"
          aria-label="Open Rhockstar AI"
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-20
            md:bottom-8
            right-4
            md:right-8
            z-[9999]
            p-4
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            text-white
            shadow-lg
            hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
            hover:scale-110
            transition-transform
            duration-200
            ease-out
          "
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      {/* ================================
          AI CHAT WINDOW
      ================================= */}

      {isOpen && (
        <div
          className="
            fixed
            bottom-0
            md:bottom-8
            right-0
            md:right-8
            w-full
            md:w-96
            h-[85vh]
            md:h-[600px]
            bg-slate-900
            border
            border-white/10
            md:rounded-2xl
            shadow-2xl
            z-[9999]
            flex
            flex-col
            overflow-hidden
            animate-in
            fade-in
            slide-in-from-bottom-4
            duration-300
          "
        >
          {/* ================================
              HEADER
          ================================= */}

          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white leading-tight">
                  Rhockstar AI
                </h3>

                <p className="text-xs text-purple-400 font-medium">
                  Powered by Gemini
                </p>
              </div>

            </div>

            <button
              type="button"
              aria-label="Close Rhockstar AI"
              onClick={() => setIsOpen(false)}
              className="
                p-2
                text-slate-400
                hover:text-white
                bg-white/5
                hover:bg-white/10
                rounded-full
                transition-colors
              "
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* ================================
              PERSONA SELECTOR
          ================================= */}

          <div className="flex p-2 bg-slate-800/50 gap-2 border-b border-white/5">

            <button
              type="button"
              onClick={() => handlePersonaChange("career")}
              className={`
                flex-1
                py-1.5
                rounded-lg
                text-sm
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                ${
                  persona === "career"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:bg-white/5"
                }
              `}
            >
              <Briefcase className="w-4 h-4" />
              Career
            </button>

            <button
              type="button"
              onClick={() => handlePersonaChange("dating")}
              className={`
                flex-1
                py-1.5
                rounded-lg
                text-sm
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                ${
                  persona === "dating"
                    ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                    : "text-slate-400 hover:bg-white/5"
                }
              `}
            >
              <Heart className="w-4 h-4" />
              Dating
            </button>

          </div>

          {/* ================================
              MESSAGES
          ================================= */}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[85%]
                    rounded-2xl
                    px-4
                    py-3
                    ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-sm"
                        : "bg-slate-800 text-slate-200 rounded-tl-sm border border-white/5"
                    }
                  `}
                >

                  {msg.role === "ai" && (
                    <div className="flex items-center gap-2 mb-1">

                      <Bot className="w-3.5 h-3.5 text-purple-400" />

                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        AI Assistant
                      </span>

                    </div>
                  )}

                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>

                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">

                <div className="bg-slate-800 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1.5 items-center">

                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />

                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />

                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* ================================
              INPUT
          ================================= */}

          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-900 border-t border-white/10"
          >

            <div className="relative flex items-center">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="
                  w-full
                  bg-slate-800
                  border
                  border-white/10
                  rounded-full
                  pl-4
                  pr-12
                  py-3
                  text-sm
                  text-white
                  focus:outline-none
                  focus:border-purple-500/50
                  focus:ring-1
                  focus:ring-purple-500/50
                  transition-all
                  placeholder:text-slate-500
                "
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="
                  absolute
                  right-1.5
                  p-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  text-white
                  disabled:opacity-50
                  transition-opacity
                  hover:opacity-90
                "
              >
                <Send className="w-4 h-4" />
              </button>

            </div>

          </form>

        </div>
      )}
    </>
  );
}
```
