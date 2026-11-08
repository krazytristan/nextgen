'use client';

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, RotateCcw, Sparkles } from "lucide-react";

const LINE_1 = "Architecting Digital";
const LINE_2 = "Excellence & Scale.";

const TYPE_SPEED_1 = 45; // ms per char
const TYPE_SPEED_2 = 55; // ms per char
const PAUSE_BETWEEN = 200; // ms
const HOLD_DURATION = 10000; // 10s display for comfortable reading
const DELETE_SPEED = 20; // ms per char backspacing
const RESTART_PAUSE = 400; // ms before re-typing

export default function TypewriterHeadline({ loaded = true }) {
  const reduceMotion = useReducedMotion();

  // If reduced motion is requested, render full static headline
  const [text1, setText1] = useState(reduceMotion ? LINE_1 : "");
  const [text2, setText2] = useState(reduceMotion ? LINE_2 : "");
  const [phase, setPhase] = useState(reduceMotion ? "complete" : "idle");
  const [isHovered, setIsHovered] = useState(false);
  const [flash, setFlash] = useState(false);

  /* TYPEWRITER STATE MACHINE */
  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    if (!loaded) return;

    let timer;

    if (phase === "idle") {
      timer = setTimeout(() => {
        setPhase("typing1");
      }, 300);
    } else if (phase === "typing1") {
      if (text1.length < LINE_1.length) {
        timer = setTimeout(() => {
          setText1(LINE_1.slice(0, text1.length + 1));
        }, TYPE_SPEED_1);
      } else {
        timer = setTimeout(() => {
          setPhase("typing2");
        }, PAUSE_BETWEEN);
      }
    } else if (phase === "typing2") {
      if (text2.length < LINE_2.length) {
        timer = setTimeout(() => {
          setText2(LINE_2.slice(0, text2.length + 1));
        }, TYPE_SPEED_2);
      } else {
        timer = setTimeout(() => {
          setPhase("complete");
        }, 120);
      }
    } else if (phase === "complete") {
      if (!isHovered) {
        timer = setTimeout(() => {
          setPhase("deleting2");
        }, HOLD_DURATION);
      }
    } else if (phase === "deleting2") {
      if (text2.length > 0) {
        timer = setTimeout(() => {
          setText2(LINE_2.slice(0, text2.length - 1));
        }, DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setPhase("deleting1");
        }, 120);
      }
    } else if (phase === "deleting1") {
      if (text1.length > 0) {
        timer = setTimeout(() => {
          setText1(LINE_1.slice(0, text1.length - 1));
        }, DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setPhase("typing1");
        }, RESTART_PAUSE);
      }
    }

    return () => clearTimeout(timer);
  }, [loaded, phase, text1, text2, isHovered, reduceMotion]);

  /* INTERACTIVE REPLAY */
  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    if (reduceMotion) return;

    setFlash(true);
    setText1("");
    setText2("");
    setPhase("typing1");

    setTimeout(() => {
      setFlash(false);
    }, 400);
  };

  return (
    <div
      className="relative group select-none cursor-pointer w-full"
      onClick={handleReplay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleReplay(e);
        }
      }}
      title="Interactive Headline • Click to replay typewriter animation"
    >
      {/* SCREEN READER FULL ACCESSIBILITY */}
      <h1 className="sr-only">
        {LINE_1} {LINE_2}
      </h1>

      {/* ZERO-LAYOUT-SHIFT DUAL-LAYER GRID CONTAINER */}
      <div className="grid grid-cols-1 grid-rows-1 relative">
        {/* SIZING GHOST: INVISIBLE LAYER THAT GUARANTEES ZERO CLS ACROSS ALL SCREEN SIZES */}
        <div
          aria-hidden="true"
          className="invisible pointer-events-none select-none col-start-1 row-start-1"
        >
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            {LINE_1}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mt-1 sm:mt-2 text-transparent">
            {LINE_2}
          </span>
        </div>

        {/* ACTIVE VISUAL TYPEWRITER OVERLAY */}
        <div
          aria-hidden="true"
          className={`col-start-1 row-start-1 transition-all duration-300 ${
            flash ? "brightness-125 scale-[0.995]" : ""
          }`}
        >
          {/* LINE 1 */}
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            {text1}
            {(phase === "idle" || phase === "typing1" || phase === "deleting1") && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[5px] h-[0.85em] align-middle bg-horizon-amber rounded-full shadow-[0_0_14px_rgba(243,182,100,0.9)]"
              />
            )}
          </span>

          {/* LINE 2 */}
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow mt-1 sm:mt-2">
            {text2}
            {(phase === "typing2" || phase === "complete" || phase === "deleting2") && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] md:w-[5px] h-[0.85em] align-middle bg-horizon-amber rounded-full shadow-[0_0_16px_rgba(243,182,100,1)]"
              />
            )}
          </span>
        </div>
      </div>

      {/* RESPONSIVE INTERACTIVE STATUS CONTROLS */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-horizon-amber/40 transition-colors">
          <Terminal className="w-3 h-3 text-horizon-amber shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300">
            {phase === "complete"
              ? isHovered
                ? "Paused"
                : "Typewriter Active"
              : "Live Streaming..."}
          </span>
          <span className="text-zinc-600">•</span>
          <button
            type="button"
            onClick={handleReplay}
            className="text-[10px] sm:text-[11px] font-mono text-horizon-amber hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className={`w-3 h-3 shrink-0 ${flash ? "animate-spin text-white" : ""}`} />
            <span>Replay</span>
          </button>
        </div>

        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-mono text-horizon-amber/80 hidden sm:inline-flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Interactive Terminal</span>
          </motion.span>
        )}
      </div>
    </div>
  );
}
