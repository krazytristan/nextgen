'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMic, FiTrash2 } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("chat-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  const API_URL = "http://localhost:5000/api/chat";

  /* SAVE + AUTO SCROLL */
  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* AUTO FOCUS */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  /* FORMAT TIME */
  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* TYPEWRITER EFFECT */
  const typeReply = async (text) => {
    let current = "";

    const botMessage = {
      id: Date.now(),
      from: "bot",
      text: "",
      time: getTime(),
    };

    setMessages((prev) => [...prev, botMessage]);

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      await new Promise((res) => setTimeout(res, 10));

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });
    }
  };

  /* SEND MESSAGE */
  const sendMessage = async (customText = null) => {
    if (sending) return;

    const text = customText || input;
    if (!text.trim()) return;

    setSending(true);

    const userMsg = {
      id: Date.now(),
      from: "user",
      text,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      await typeReply(data.reply || "No response from AI.");
    } catch (err) {
      console.error("CHAT ERROR:", err);
      await typeReply("⚠️ AI connection failed.");
    }

    setTyping(false);
    setSending(false);
  };

  /* CLEAR CHAT */
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chat-history");
  };

  /* VOICE INPUT */
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full 
        bg-gradient-to-r from-horizon-amber to-yellow-400 
        shadow-xl flex items-center justify-center text-black"
        whileTap={{ scale: 0.9 }}
      >
        <BsRobot size={28} />
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragMomentum={false}
            className="fixed bottom-24 right-6 w-[360px] max-h-[520px] 
            bg-zinc-950/95 backdrop-blur-3xl border border-white/15 
            rounded-3xl shadow-2xl shadow-black flex flex-col z-50 overflow-hidden text-white"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
          >

            {/* HEADER */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-horizon-orange to-horizon-amber flex items-center justify-center text-black shadow-md">
                  <BsRobot size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Horizon Assistant</p>
                  <p className="text-[10px] text-horizon-green font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-horizon-green inline-block animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>

              <button
                onClick={clearChat}
                className="text-zinc-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition"
                title="Clear Chat History"
              >
                <FiTrash2 size={15} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.from === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black font-medium shadow-md shadow-orange-500/10"
                        : "bg-zinc-900 border border-white/10 text-zinc-200"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] text-zinc-500 mt-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {typing && (
                <div className="bg-zinc-900 border border-white/10 px-3 py-2 rounded-xl w-fit text-zinc-400 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-horizon-amber animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-horizon-amber animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-horizon-amber animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              {/* QUICK BUTTONS */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Web Systems", "Mobile Apps", "Cloud / DevOps", "Pricing"].map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="text-[11px] font-medium bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full text-zinc-300 hover:bg-horizon-amber hover:text-black hover:border-horizon-amber transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div ref={endRef} />
            </div>

            {/* INPUT BAR */}
            <div className="p-3 border-t border-white/10 flex gap-2 bg-white/[0.01]">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 outline-none text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-horizon-amber transition"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={startVoice}
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                title="Voice input"
              >
                <FiMic size={15} />
              </button>

              <button
                disabled={sending || !input.trim()}
                onClick={() => sendMessage()}
                className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center ${
                  sending || !input.trim()
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black hover:scale-105 active:scale-95 shadow-md shadow-orange-500/20"
                }`}
              >
                <FiSend size={15} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}