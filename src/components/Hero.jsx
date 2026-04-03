'use client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPhp,
  FaLaravel,
  FaPython,
  FaAws,
  FaDocker
} from "react-icons/fa";

import Chatbot from "./Chatbot";

/* ================= DATA ================= */
const slides = [
  { title: "Web Systems", desc: "High-performance platforms engineered for scalability, reliability, and speed." },
  { title: "System Development", desc: "Custom-built systems to streamline operations." },
  { title: "Cloud Solutions", desc: "Secure and flexible cloud infrastructure." },
  { title: "Mobile Applications", desc: "Cross-platform apps built for performance." },
  { title: "UI / UX Design", desc: "Modern, intuitive user experiences." },
  { title: "IT Support", desc: "Reliable monitoring and expert assistance." },
  { title: "Network & Infrastructure", desc: "Secure and scalable network systems." },
  { title: "Cybersecurity", desc: "Advanced protection for systems and data." },
];

const bgImages = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
];

const gradients = [
  "from-black/70 via-black/40 to-black/80",
  "from-indigo-900/70 via-black/40 to-black/80",
  "from-orange-900/70 via-black/40 to-black/80",
  "from-purple-900/70 via-black/40 to-black/80",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  /* AUTO SLIDE (FIXED SMOOTH LOOP) */
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [isHovered]);

  const handleDotClick = (i) => {
    setIndex(i);
    clearInterval(timerRef.current);
  };

  /* PARALLAX */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-20px", "20px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-20px", "20px"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || reduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  /* SERVICES */
  const goToServices = () => {
    const section = document.getElementById("services");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      section.classList.add("ring-4", "ring-horizon-amber");

      setTimeout(() => {
        section.classList.remove("ring-4", "ring-horizon-amber");
      }, 1500);
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden text-white"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImages[index % bgImages.length]})`,
              x: bgX,
              y: bgY
            }}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
      </div>

      {/* GRADIENT */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} z-0`} />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 w-full px-6 lg:px-20 py-20"
      >
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-extrabold leading-tight text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              Next-Generation
              <span className="block text-horizon-amber">IT Solutions</span>
              Built for Scale
            </motion.h1>

            <p className="text-white/80 text-lg max-w-xl">
              We build secure, scalable, and high-performance systems
              to help organizations grow and operate efficiently.
            </p>

            {/* 🔥 MAGNETIC BUTTON */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-horizon-amber text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-horizon-amber/50 transition-all"
              onClick={goToServices}
            >
              View Services
            </motion.button>
          </div>

          {/* RIGHT CARD (GLASS + GLOW) */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.03 }}
            animate={!reduceMotion ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="relative rounded-3xl p-6 md:p-8
              bg-white/10 backdrop-blur-xl border border-white/20
              shadow-[0_20px_80px_rgba(255,165,0,0.15)]">

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                >
                  <h2 className="text-xl md:text-2xl font-semibold mb-3">
                    {slides[index].title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base">
                    {slides[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* PROGRESS */}
              <div className="mt-6 h-[4px] bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  key={index}
                  className="h-full bg-horizon-amber"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>

              {/* DOTS */}
              <div className="flex gap-2 mt-4 justify-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === index ? "bg-horizon-amber scale-125" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ICON MARQUEE (FIXED LOOP) */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="bg-black/40 backdrop-blur-md border-t border-white/10 py-4 overflow-hidden">
          <motion.div
            className="flex gap-16 text-2xl w-max px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 opacity-80">
                <FaReact />
                <FaNodeJs />
                <FaJs />
                <FaPhp />
                <FaLaravel />
                <FaPython />
                <FaAws />
                <FaDocker />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <Chatbot />
    </section>
  );
}