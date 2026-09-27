'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statusMessages = [
  "Initializing digital architecture...",
  "Loading high-performance modules...",
  "Configuring cloud infrastructure...",
  "Ready to launch.",
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1800; // 1.8 seconds - fast, snappy, high-impact

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth cubic-out easing curve
      const easedProgress = Math.floor(
        (1 - Math.pow(1 - rawProgress, 3)) * 100
      );

      setProgress(easedProgress);

      if (easedProgress < 30) {
        setStatusIndex(0);
      } else if (easedProgress < 65) {
        setStatusIndex(1);
      } else if (easedProgress < 95) {
        setStatusIndex(2);
      } else {
        setStatusIndex(3);
      }

      if (rawProgress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 200);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0.9,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden select-none"
        >
          {/* AMBIENT BACKGROUND GLOW */}
          <div className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-horizon-orange/15 via-horizon-amber/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* BACKGROUND SUBTLE GRID */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* LOGO ICON WITH PULSING RING */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-8"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-horizon-orange via-horizon-amber to-horizon-yellow flex items-center justify-center font-black text-black text-2xl sm:text-3xl shadow-2xl shadow-orange-500/30">
                <span>H9</span>
              </div>
              <div className="absolute -inset-2.5 rounded-3xl border border-horizon-amber/30 animate-pulse pointer-events-none" />
              <div className="absolute -inset-5 rounded-3xl border border-horizon-orange/15 animate-ping [animation-duration:3s] pointer-events-none" />
            </motion.div>

            {/* BRAND TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                HORIZON IT SOLUTIONS
              </h2>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 tracking-widest uppercase mt-1">
                Next-Gen Digital Systems
              </p>
            </motion.div>

            {/* PROGRESS BAR & PERCENTAGE */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="truncate pr-2 text-zinc-300">
                  {statusMessages[statusIndex]}
                </span>
                <span className="font-bold text-horizon-amber tabular-nums">
                  {progress}%
                </span>
              </div>

              {/* PROGRESS TRACK */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow rounded-full shadow-lg shadow-orange-500/50"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* HIGH-LEVEL TAGS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-zinc-400 mt-8"
            >
              <span>Architecture</span>
              <span>•</span>
              <span>Scale</span>
              <span>•</span>
              <span>Precision</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
