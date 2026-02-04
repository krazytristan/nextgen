import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const slides = [
  { title: "Web Systems", desc: "High-performance platforms engineered for scalability, reliability, and speed." },
  { title: "System Development", desc: "Custom-built information systems tailored to streamline operations and improve efficiency." },
  { title: "Cloud Solutions", desc: "Secure, flexible cloud infrastructure that evolves with your business." },
  { title: "Mobile Applications", desc: "Cross-platform mobile apps designed for performance, usability, and growth." },
  { title: "UI / UX Design", desc: "User-centered designs that create intuitive, engaging, and consistent digital experiences." },
  { title: "IT Support", desc: "Proactive monitoring, maintenance, and expert technical assistance." },
  { title: "Network & Infrastructure", desc: "Reliable network design, setup, and maintenance for secure connectivity." },
  { title: "Cybersecurity", desc: "Modern security strategies to protect systems, data, and users." },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const timer = useRef(null);
  const sectionRef = useRef(null);

  /* ================= CAROUSEL ================= */
  const startCarousel = () => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4800);
  };

  useEffect(() => {
    startCarousel();
    return () => clearInterval(timer.current);
  }, []);

  /* ================= SCROLL FADE ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridFade = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  /* ================= RESPONSIVE MOUSE PARALLAX ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-3px", "3px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-3px", "3px"]);

  const fgX = useTransform(mouseX, [-0.5, 0.5], ["-6px", "6px"]);
  const fgY = useTransform(mouseY, [-0.5, 0.5], ["-6px", "6px"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden
                 bg-gradient-to-b from-[#8fb36b] to-[#6f8f55] text-white"
    >
      {/* TOP ACCENT */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-[3px]
                   bg-gradient-to-r from-horizon-orange via-horizon-amber to-transparent"
      />

      {/* ================= BACK GRID (RESPONSIVE) ================= */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          x: bgX,
          y: bgY,
          opacity: gridFade,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "min(72px, 12vw) min(72px, 12vw)", // responsive density
        }}
        animate={
          reduceMotion
            ? {}
            : { backgroundPosition: ["0px 0px", "72px 72px"] }
        }
        transition={{
          duration: 160,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* ================= FOREGROUND GRID ================= */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          x: fgX,
          y: fgY,
          opacity: gridFade,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.32) 1px, transparent 1px)
          `,
          backgroundSize: "min(48px, 8vw) min(48px, 8vw)",
        }}
        animate={
          reduceMotion
            ? {}
            : { backgroundPosition: ["0px 0px", "48px 48px"] }
        }
        transition={{
          duration: 110,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* VIGNETTE */}
      <div
        aria-hidden
        className="absolute inset-0 z-0
                   bg-gradient-to-b from-black/10 via-transparent to-black/25"
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 container px-6 pt-28 sm:pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-5 px-5 py-2 rounded-full
                         bg-white/15 text-xs sm:text-sm font-semibold"
            >
              🚀 NEXGEN 9 IT SOLUTIONS
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[1.9rem] sm:text-[2.6rem] lg:text-[3.8rem]
                         font-extrabold leading-tight mb-5"
            >
              Next-Generation{" "}
              <span className="block text-horizon-amber">
                IT Solutions
              </span>
              for Modern Businesses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-white/85 text-sm sm:text-base lg:text-lg mb-8"
            >
              We design, build, and support secure digital systems that help
              organizations scale efficiently and operate with confidence.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="px-8 py-3 rounded-full bg-white
                           text-horizon-green font-semibold shadow
                           hover:opacity-90 transition"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full border
                           border-white/60 text-white
                           hover:bg-white/10 transition"
              >
                Talk to Us
              </a>
            </div>
          </div>

          {/* RIGHT – CAROUSEL */}
          <div
            className="relative"
            onMouseEnter={() => clearInterval(timer.current)}
            onMouseLeave={startCarousel}
          >
            <div className="relative max-w-md lg:border-l lg:border-white/30 lg:pl-10">

              <div className="mb-4 lg:absolute lg:-left-6 lg:top-0
                              text-white/50 text-xs font-mono">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
                    {slides[index].title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {slides[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL HINT */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   text-white/60 text-[10px] tracking-widest uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
