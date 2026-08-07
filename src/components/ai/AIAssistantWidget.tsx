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
  // ==========================================
  // STATE
  // ==========================================

  const [isOpen, setIsOpen] = useState(false);

  const [persona, setPersona] =
    useState<AIPersona>("career");

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

  // ==========================================
  // MESSAGE SCROLL REF
  // ==========================================

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  // ==========================================
  // AI WINDOW REF
  // ==========================================

  const aiWindowRef =
    useRef<HTMLDivElement | null>(null);

  // ==========================================
  // DRAGGING STATE
  // ==========================================

  const [position, setPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const dragData = useRef({
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
  });

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages, isTyping, isOpen]);

  // ==========================================
  // RESET POSITION WHEN OPENING
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const setInitialPosition = () => {
      const width =
        window.innerWidth >= 768
          ? 384
          : window.innerWidth;

      const height =
        window.innerWidth >= 768
          ? 600
          : Math.min(
              window.innerHeight * 0.85,
              window.innerHeight
            );

      const margin =
        window.innerWidth >= 768 ? 32 : 0;

      const x = Math.max(
        0,
        window.innerWidth - width - margin
      );

      const y = Math.max(
        0,
        window.innerHeight - height - margin
      );

      setPosition({
        x,
        y,
      });
    };

    setInitialPosition();

    window.addEventListener(
      "resize",
      setInitialPosition
    );

    return () => {
      window.removeEventListener(
        "resize",
        setInitialPosition
      );
    };
  }, [isOpen]);

  // ==========================================
  // DRAG START
  // ==========================================

  const handleDragStart = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!aiWindowRef.current) return;

    const rect =
      aiWindowRef.current.getBoundingClientRect();

    dragData.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: rect.left,
      startTop: rect.top,
    };

    setIsDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  // ==========================================
  // DRAG MOVE
  // ==========================================

  const handleDragMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const windowElement =
      aiWindowRef.current;

    if (!windowElement) return;

    const rect =
      windowElement.getBoundingClientRect();

    const deltaX =
      event.clientX -
      dragData.current.startX;

    const deltaY =
      event.clientY -
      dragData.current.startY;

    let newX =
      dragData.current.startLeft + deltaX;

    let newY =
      dragData.current.startTop + deltaY;

    // ========================================
    // KEEP WINDOW INSIDE SCREEN
    // ========================================

    const maxX =
      window.innerWidth - rect.width;

    const maxY =
      window.innerHeight - rect.height;

    newX = Math.max(
      0,
      Math.min(newX, maxX)
    );

    newY = Math.max(
      0,
      Math.min(newY, maxY)
    );

    setPosition({
      x: newX,
      y: newY,
    });
  };

  // ==========================================
  // DRAG END
  // ==========================================

  const handleDragEnd = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    setIsDragging(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  // ==========================================
  // PERSONA CHANGE
  // ==========================================

  const handlePersonaChange = (
    newPersona: AIPersona
  ) => {
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

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSend = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const message = input.trim();

    if (!message || isTyping) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const responseContent =
        await getAIResponse(
          persona,
          userMsg.content
        );

      setMessages((prev) => [
        ...prev,
        {
          id: (
            Date.now() + 1
          ).toString(),
          role: "ai",
          content: responseContent,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(
        "Rhockstar AI error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          id: (
            Date.now() + 1
          ).toString(),
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

  // ==========================================
  // CLOSE AI
  // ==========================================

  const handleClose = () => {
    setIsOpen(false);
    setIsDragging(false);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      {/* ======================================
          FLOATING AI BUTTON
      ====================================== */}

      {!isOpen && (
        <button
          type="button"
          aria-label="Open Rhockstar AI"
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-20
            right-4
            md:bottom-8
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

      {/* ======================================
          AI CHAT WINDOW
      ====================================== */}

      {isOpen && position && (
        <div
          ref={aiWindowRef}
          className={`
            fixed
            z-[9999]
            w-full
            md:w-96
            h-[85vh]
            md:h-[600px]
            bg-slate-900
            border
            border-white/10
            rounded-t-2xl
            md:rounded-2xl
            shadow-2xl
            flex
            flex-col
            overflow-hidden
            select-none
            ${
              isDragging
                ? "transition-none"
                : "animate-in fade-in slide-in-from-bottom-4 duration-300"
            }
          `}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            touchAction: "none",
          }}
        >
          {/* ==================================
              HEADER / DRAG HANDLE
          ================================== */}

          <div
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            className={`
              p-4
              border-b
              border-white/10
              bg-gradient-to-r
              from-slate-800
              to-slate-900
              flex
              items-center
              justify-between
              ${
                isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }
            `}
            style={{
              touchAction: "none",
            }}
          >
            {/* AI INFO */}

            <div className="flex items-center gap-3 pointer-events-none">
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

            {/* CLOSE BUTTON */}

            <button
              type="button"
              aria-label="Close Rhockstar AI"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={handleClose}
              className="
                p-2
                text-slate-400
                hover:text-white
                bg-white/5
                hover:bg-white/10
                rounded-full
                transition-colors
                cursor-pointer
                z-10
              "
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* ==================================
              PERSONA SELECTOR
          ================================== */}

          <div
            className="
              flex
              p-2
              bg-slate-800/50
              gap-2
              border-b
              border-white/5
            "
            style={{
              touchAction: "auto",
            }}
          >
            {/* CAREER */}

            <button
              type="button"
              onClick={() =>
                handlePersonaChange("career")
              }
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

            {/* DATING */}

            <button
              type="button"
              onClick={() =>
                handlePersonaChange("dating")
              }
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

          {/* ==================================
              MESSAGES
          ================================== */}

          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              p-4
              space-y-4
              custom-scrollbar
              select-text
            "
            style={{
              touchAction: "pan-y",
            }}
          >
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
                  {/* AI LABEL */}

                  {msg.role === "ai" && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-3.5 h-3.5 text-purple-400" />

                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        AI Assistant
                      </span>
                    </div>
                  )}

                  {/* MESSAGE */}

                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1.5 items-center">
                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-purple-400
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDelay: "0ms",
                    }}
                  />

                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-purple-400
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDelay: "150ms",
                    }}
                  />

                  <div
                    className="
                      w-1.5
                      h-1.5
                      bg-purple-400
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ==================================
              INPUT
          ================================== */}

          <form
            onSubmit={handleSend}
            className="
              p-3
              bg-slate-900
              border-t
              border-white/10
              shrink-0
            "
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
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
                  select-text
                "
              />

              {/* SEND */}

              <button
                type="submit"
                disabled={
                  !input.trim() ||
                  isTyping
                }
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
                  disabled:cursor-not-allowed
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
