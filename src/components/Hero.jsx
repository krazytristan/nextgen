'use client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  FaReact, FaNodeJs, FaJs, FaPhp,
  FaLaravel, FaPython, FaAws, FaDocker
} from "react-icons/fa";

import Chatbot from "./Chatbot";

/* ================= DATA ================= */
const slides = [
  { title: "Web Systems", desc: "High-performance platforms engineered for scalability, reliability, and speed." },
  { title: "System Development", desc: "Custom-built systems to streamline your business operations." },
  { title: "Cloud Solutions", desc: "Secure and flexible cloud infrastructure designed for growth." },
  { title: "Mobile Applications", desc: "Cross-platform apps built for performance." },
  { title: "UI / UX Design", desc: "Human-centric experiences that drive engagement." },
  { title: "IT Support", desc: "24/7 monitoring and expert assistance." },
  { title: "Network Infrastructure", desc: "Secure and scalable networks." },
  { title: "Cybersecurity", desc: "End-to-end protection for your data." },
];

const bgImages = ["/images/bg1.png","/images/bg2.png","/images/bg3.png","/images/bg4.png"];

const gradients = [
  "from-black via-black/60 to-black/80",
  "from-indigo-950/80 via-black/50 to-black/90",
  "from-orange-950/80 via-black/50 to-black/90",
  "from-slate-900/80 via-black/50 to-black/90",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (isHovered) return;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  /* Pause when tab inactive */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleDotClick = (i) => {
    setIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /* ================= PARALLAX ================= */
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  const smoothX = useSpring(mX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mY, { damping: 25, stiffness: 150 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-15px", "15px"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mX.set((e.clientX - rect.left) / rect.width - 0.5);
    mY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const goToServices = () => {
    const section = document.getElementById("services");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mX.set(0);
        mY.set(0);
      }}
      className="relative w-full min-h-screen flex items-center overflow-hidden text-white bg-black"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index % bgImages.length}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImages[index % bgImages.length]})`, x: bgX, y: bgY }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} z-10`} />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <h1 className="font-black text-5xl md:text-6xl lg:text-7xl mb-8">
              Next-Gen
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-horizon-amber to-orange-400">
                IT Solutions
              </span>
            </h1>

            <p className="text-white/70 text-lg mb-10 max-w-lg">
              We engineer high-performance digital ecosystems for modern businesses.
            </p>

            <div className="flex gap-4">
              <button
                onClick={goToServices}
                className="bg-horizon-amber text-black px-8 py-4 rounded-2xl font-bold"
              >
                Explore Services
              </button>

              <button className="border border-white/30 px-8 py-4 rounded-2xl">
                Our Process
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative max-w-md w-full">
            <div className="rounded-3xl p-8 bg-black/40 backdrop-blur-xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {slides[index].title}
                  </h2>
                  <p className="text-white/60">
                    {slides[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* PROGRESS */}
              <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={index}
                  className="h-full bg-horizon-amber"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </div>

              {/* DOTS */}
              <div className="flex gap-2 mt-6">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => handleDotClick(i)}>
                    <div className={`h-1 ${i === index ? "w-8 bg-horizon-amber" : "w-3 bg-white/30"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TECH STRIP */}
      <div className="absolute bottom-0 w-full bg-black/60 py-4">
        <div className="flex gap-10 justify-center text-2xl opacity-50">
          <FaReact /><FaNodeJs /><FaJs /><FaPhp />
          <FaLaravel /><FaPython /><FaAws /><FaDocker />
        </div>
      </div>

      <Chatbot />
    </section>
  );
}