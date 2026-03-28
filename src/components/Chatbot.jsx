'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMic } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const endRef = useRef(null);

  /* LOAD HISTORY */
  useEffect(() => {
    const saved = localStorage.getItem("chat-history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  /* SAVE HISTORY */
  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* REAL AI CALL */
  const sendMessage = async (customText = null) => {
    const text = customText || input;
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error connecting to AI." },
      ]);
    }

    setTyping(false);
  };

  /* 🎤 VOICE INPUT */
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
        id="chatbot-toggle"
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
            rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden cursor-move"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* HEADER */}
            <div className="p-4 border-b border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-horizon-amber flex items-center justify-center">
                <BsRobot />
              </div>
              <div>
                <p className="font-semibold">AI Assistant</p>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                    msg.from === "user"
                      ? "ml-auto bg-horizon-amber text-black"
                      : "bg-white/20"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {typing && (
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  typing...
                </div>
              )}

              {/* 🔥 QUICK SERVICES */}
              <div className="flex flex-wrap gap-2">
                {["Web System", "Mobile App", "Cloud", "Pricing"].map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="text-xs bg-white/20 px-2 py-1 rounded"
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
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 p-2 rounded-lg bg-white/20 outline-none text-white"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              {/* 🎤 MIC */}
              <button
                onClick={startVoice}
                className="bg-white/20 p-2 rounded-lg"
              >
                <FiMic />
              </button>

              <button
                onClick={() => sendMessage()}
                className="bg-horizon-amber p-2 rounded-lg text-black"
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