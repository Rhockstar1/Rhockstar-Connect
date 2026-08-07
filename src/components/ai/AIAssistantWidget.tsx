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
import type {
AIPersona,
AIMessage,
} from "@/lib/services/ai";

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
"Hi! I'm Rhockstar AI. How can I help you level up your career today?",
timestamp: new Date(),
},
]);

const [input, setInput] = useState("");

const [isTyping, setIsTyping] = useState(false);

// ==========================================
// WINDOW REF
// ==========================================

const aiWindowRef =
useRef<HTMLDivElement | null>(null);

const messagesEndRef =
useRef<HTMLDivElement | null>(null);

// ==========================================
// POSITION
// ==========================================

const [position, setPosition] = useState<{
x: number;
y: number;
} | null>(null);

// ==========================================
// DRAGGING
// ==========================================

const [isDragging, setIsDragging] =
useState(false);

const dragData = useRef({
startX: 0,
startY: 0,
startLeft: 0,
startTop: 0,
});

// ==========================================
// GENERATE UNIQUE MESSAGE ID
// ==========================================

const createMessageId = () => {
return `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
};

// ==========================================
// SET INITIAL POSITION
// ==========================================

const calculatePosition = () => {
if (typeof window === "undefined") return;

```
const isMobile =
  window.innerWidth < 768;

const width = isMobile
  ? window.innerWidth
  : 384;

const height = isMobile
  ? Math.min(
      window.innerHeight * 0.85,
      window.innerHeight
    )
  : 600;

const margin = isMobile ? 0 : 32;

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
```

};

// ==========================================
// OPEN WINDOW
// ==========================================

useEffect(() => {
if (!isOpen) return;

```
calculatePosition();

const handleResize = () => {
  if (!aiWindowRef.current) {
    calculatePosition();
    return;
  }

  const rect =
    aiWindowRef.current.getBoundingClientRect();

  const maxX = Math.max(
    0,
    window.innerWidth - rect.width
  );

  const maxY = Math.max(
    0,
    window.innerHeight - rect.height
  );

  setPosition((current) => {
    if (!current) {
      return {
        x: maxX,
        y: maxY,
      };
    }

    return {
      x: Math.min(
        Math.max(0, current.x),
        maxX
      ),
      y: Math.min(
        Math.max(0, current.y),
        maxY
      ),
    };
  });
};

window.addEventListener(
  "resize",
  handleResize
);

return () => {
  window.removeEventListener(
    "resize",
    handleResize
  );
};
```

}, [isOpen]);

// ==========================================
// AUTO SCROLL
// ==========================================

useEffect(() => {
if (!isOpen) return;

```
const timer = window.setTimeout(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}, 50);

return () => {
  window.clearTimeout(timer);
};
```

}, [
messages,
isTyping,
isOpen,
]);

// ==========================================
// DRAG START
// ==========================================

const handleDragStart = (
event: React.PointerEvent<HTMLDivElement>
) => {
if (
event.pointerType === "mouse" &&
event.button !== 0
) {
return;
}

```
if (!aiWindowRef.current) return;

// Don't drag on mobile.
if (window.innerWidth < 768) {
  return;
}

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
```

};

// ==========================================
// DRAG MOVE
// ==========================================

const handleDragMove = (
event: React.PointerEvent<HTMLDivElement>
) => {
if (!isDragging) return;

```
if (!aiWindowRef.current) return;

const rect =
  aiWindowRef.current.getBoundingClientRect();

const deltaX =
  event.clientX -
  dragData.current.startX;

const deltaY =
  event.clientY -
  dragData.current.startY;

const maxX = Math.max(
  0,
  window.innerWidth - rect.width
);

const maxY = Math.max(
  0,
  window.innerHeight - rect.height
);

let newX =
  dragData.current.startLeft + deltaX;

let newY =
  dragData.current.startTop + deltaY;

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
```

};

// ==========================================
// DRAG END
// ==========================================

const handleDragEnd = (
event: React.PointerEvent<HTMLDivElement>
) => {
setIsDragging(false);

```
try {
  if (
    event.currentTarget.hasPointerCapture(
      event.pointerId
    )
  ) {
    event.currentTarget.releasePointerCapture(
      event.pointerId
    );
  }
} catch {
  // Ignore pointer release errors.
}
```

};

// ==========================================
// CHANGE PERSONA
// ==========================================

const handlePersonaChange = (
newPersona: AIPersona
) => {
if (persona === newPersona) return;

```
setPersona(newPersona);

setMessages([
  {
    id: createMessageId(),
    role: "ai",
    content:
      newPersona === "career"
        ? "You're now talking to Career Coach. I can help with your resume, interviews, job search, career planning, and professional growth."
        : "You're now talking to Dating Wingman. I can help with your dating profile, conversations, openers, and date ideas.",
    timestamp: new Date(),
  },
]);
```

};

// ==========================================
// SEND MESSAGE
// ==========================================

const handleSend = async (
event: React.FormEvent<HTMLFormElement>
) => {
event.preventDefault();

```
const message = input.trim();

if (!message || isTyping) {
  return;
}

const userMessage: AIMessage = {
  id: createMessageId(),
  role: "user",
  content: message,
  timestamp: new Date(),
};

setMessages((previous) => [
  ...previous,
  userMessage,
]);

setInput("");
setIsTyping(true);

try {
  const response =
    await getAIResponse(
      persona,
      message
    );

  const aiMessage: AIMessage = {
    id: createMessageId(),
    role: "ai",
    content: response,
    timestamp: new Date(),
  };

  setMessages((previous) => [
    ...previous,
    aiMessage,
  ]);
} catch (error) {
  console.error(
    "Rhockstar AI error:",
    error
  );

  const errorMessage: AIMessage = {
    id: createMessageId(),
    role: "ai",
    content:
      "Sorry, I couldn't process that right now. Please try again.",
    timestamp: new Date(),
  };

  setMessages((previous) => [
    ...previous,
    errorMessage,
  ]);
} finally {
  setIsTyping(false);
}
```

};

// ==========================================
// CLOSE
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
FLOATING BUTTON
====================================== */}

```
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
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        bg-gradient-to-r
        from-blue-500
        to-purple-500
        text-white
        shadow-lg
        hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
        hover:scale-110
        active:scale-95
        transition-all
        duration-200
      "
    >
      <Sparkles className="w-6 h-6" />
    </button>
  )}

  {/* ======================================
      CHAT WINDOW
  ====================================== */}

  {isOpen && position && (
    <div
      ref={aiWindowRef}
      className="
        fixed
        z-[9999]
        w-screen
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
      "
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* ==================================
          HEADER
      ================================== */}

      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        className={`
          shrink-0
          p-4
          border-b
          border-white/10
          bg-gradient-to-r
          from-slate-800
          to-slate-900
          flex
          items-center
          justify-between
          select-none
          ${
            isDragging
              ? "cursor-grabbing"
              : "md:cursor-grab"
          }
        `}
        style={{
          touchAction: "none",
        }}
      >
        {/* AI INFO */}

        <div className="flex items-center gap-3">
          <div
            className="
              w-10
              h-10
              shrink-0
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-purple-500
              flex
              items-center
              justify-center
              p-0.5
            "
          >
            <div
              className="
                w-full
                h-full
                bg-slate-900
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white leading-tight">
              Rhockstar AI
            </h3>

            <p className="text-xs text-purple-400 font-medium">
              Your personal assistant
            </p>
          </div>
        </div>

        {/* CLOSE */}

        <button
          type="button"
          aria-label="Close Rhockstar AI"
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleClose();
          }}
          className="
            shrink-0
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-full
            text-slate-400
            hover:text-white
            bg-white/5
            hover:bg-white/10
            active:scale-95
            transition-all
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
          shrink-0
          flex
          gap-2
          p-2
          bg-slate-800/50
          border-b
          border-white/5
        "
      >
        {/* CAREER */}

        <button
          type="button"
          onClick={() =>
            handlePersonaChange(
              "career"
            )
          }
          className={`
            flex-1
            py-2
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
            handlePersonaChange(
              "dating"
            )
          }
          className={`
            flex-1
            py-2
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
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
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
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-slate-800 text-slate-200 rounded-tl-sm border border-white/5"
                }
              `}
            >
              {message.role === "ai" && (
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3.5 h-3.5 text-purple-400" />

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Rhockstar AI
                  </span>
                </div>
              )}

              <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {/* TYPING */}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className="
                bg-slate-800
                border
                border-white/5
                rounded-2xl
                rounded-tl-sm
                px-4
                py-4
                flex
                gap-1.5
                items-center
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  bg-purple-400
                  rounded-full
                  animate-bounce
                "
              />

              <span
                className="
                  w-1.5
                  h-1.5
                  bg-purple-400
                  rounded-full
                  animate-bounce
                "
                style={{
                  animationDelay:
                    "150ms",
                }}
              />

              <span
                className="
                  w-1.5
                  h-1.5
                  bg-purple-400
                  rounded-full
                  animate-bounce
                "
                style={{
                  animationDelay:
                    "300ms",
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
          shrink-0
          p-3
          bg-slate-900
          border-t
          border-white/10
        "
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder={
              persona === "career"
                ? "Ask about your career..."
                : "Ask about dating..."
            }
            autoComplete="off"
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

          <button
            type="submit"
            aria-label="Send message"
            disabled={
              !input.trim() ||
              isTyping
            }
            className="
              absolute
              right-1.5
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              text-white
              disabled:opacity-40
              disabled:cursor-not-allowed
              hover:opacity-90
              active:scale-95
              transition-all
            "
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )}
</>
```

);
}
