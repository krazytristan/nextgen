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
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
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

  const gridFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ================= PARALLAX ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-4px", "4px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-4px", "4px"]);

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
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden
                 bg-gradient-to-b from-[#8fb36b] to-[#6f8f55] text-white"
    >
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[3px]
                      bg-gradient-to-r from-horizon-orange via-horizon-amber to-transparent" />

      {/* Animated Grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          x: bgX,
          y: bgY,
          opacity: gridFade,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
        animate={
          reduceMotion ? {} : { backgroundPosition: ["0px 0px", "64px 64px"] }
        }
        transition={{ duration: 150, ease: "linear", repeat: Infinity }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-24">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div>
            <h1 className="font-extrabold leading-tight mb-6
                           text-[32px] sm:text-[42px] lg:text-[56px]">
              Next-Generation
              <span className="block text-horizon-amber">
                IT Solutions
              </span>
              Built for Scale
            </h1>

            <p className="text-white/85 leading-relaxed mb-8 max-w-2xl
                          text-[16px] sm:text-[17px] lg:text-[18px]">
              We architect, develop, and maintain secure digital ecosystems
              that empower organizations to operate efficiently and scale
              confidently in an evolving technological landscape.
            </p>
          </div>

          {/* RIGHT SIDE – PREMIUM GLASS */}
          <motion.div
            className="relative mt-12 lg:mt-0"
            animate={!reduceMotion ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 6, repeat: Infinity }}
            onMouseEnter={() => clearInterval(timer.current)}
            onMouseLeave={startCarousel}
          >
            {/* Glow Layer */}
            <div className="absolute inset-0 rounded-[30px]
                            bg-white/20 blur-3xl opacity-30" />

            <div className="relative rounded-[30px] p-8 sm:p-10
                            bg-white/10 backdrop-blur-2xl
                            border border-white/30
                            shadow-[0_30px_80px_rgba(0,0,0,0.4)]
                            overflow-hidden">

              {/* Light Sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r
                           from-transparent via-white/40 to-transparent
                           opacity-10"
                animate={!reduceMotion ? { x: ["-100%", "100%"] } : {}}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-semibold mb-4
                                 text-[20px] sm:text-[24px] lg:text-[28px]">
                    {slides[index].title}
                  </h2>

                  <p className="text-white/85 leading-relaxed
                                text-[16px] sm:text-[17px] lg:text-[18px]">
                    {slides[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="mt-8 h-[4px] w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  key={index}
                  className="h-full bg-horizon-amber"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}