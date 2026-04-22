'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMic, FiTrash2 } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  const API_URL = "http://localhost:5000/api/chat";

  /* LOAD CHAT HISTORY */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat-history");
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

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
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* HEADER */}
            <div className="p-4 border-b border-white/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-horizon-amber flex items-center justify-center">
                  <BsRobot />
                </div>
                <div>
                  <p className="font-semibold text-white">AI Assistant</p>
                  <p className="text-xs text-green-400">● Online</p>
                </div>
              </div>

              <button
                onClick={clearChat}
                className="text-white/60 hover:text-red-400"
              >
                <FiTrash2 />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.from === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                      msg.from === "user"
                        ? "bg-horizon-amber text-black"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] text-white/40 mt-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {typing && (
                <div className="bg-white/20 px-3 py-2 rounded-lg w-fit text-white">
                  typing...
                </div>
              )}

              {/* QUICK BUTTONS */}
              <div className="flex flex-wrap gap-2">
                {["Web System", "Mobile App", "Cloud", "Pricing"].map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-horizon-amber hover:text-black"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t border-white/20 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 p-2 rounded-lg bg-white/20 outline-none text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={startVoice}
                className="bg-white/20 p-2 rounded-lg text-white"
              >
                <FiMic />
              </button>

              <button
                disabled={sending || !input.trim()}
                onClick={() => sendMessage()}
                className={`p-2 rounded-lg ${
                  sending || !input.trim()
                    ? "bg-gray-400"
                    : "bg-horizon-amber text-black"
                }`}
              >
                <FiSend />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}