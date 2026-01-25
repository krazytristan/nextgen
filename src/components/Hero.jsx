import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "web",
    title: "Web Systems",
    desc: "Custom-built web platforms designed for performance, scalability, and growth.",
    icon: "⚙️",
    target: "#services",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    desc: "Flexible and secure cloud infrastructure for modern digital operations.",
    icon: "☁️",
    target: "#services",
  },
  {
    id: "support",
    title: "IT Support",
    desc: "Proactive monitoring, maintenance, and technical support you can rely on.",
    icon: "🛠️",
    target: "#services",
  },
  {
    id: "security",
    title: "Cybersecurity",
    desc: "Protecting systems, data, and users through modern security practices.",
    icon: "🔐",
    target: "#services",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const intervalRef = useRef(null);

  /* ---------- AUTO ROTATION ---------- */
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5600);

    return () => clearInterval(intervalRef.current);
  }, [paused]);

  /* ---------- KEYBOARD CONTROL ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % slides.length);
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- SWIPE ---------- */
  const onDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    } else if (info.offset.x < -100) {
      setIndex((i) => (i + 1) % slides.length);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-horizon-orange via-horizon-amber to-horizon-yellow" />
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-horizon-green/30 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-300px] right-[-300px] w-[760px] h-[760px] bg-white/20 rounded-full blur-[200px]" />

      <div className="relative z-10 container pt-40">
        <div className="row align-items-center">
          {/* ================= LEFT ================= */}
          <div className="col-lg-6 text-white">
            <span className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-sm">
              🚀 Horizon for IT Solutions
            </span>

            <h1 className="text-[3.2rem] lg:text-6xl fw-bold leading-[1.05] mb-8">
              Building <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-horizon-yellow">
                  Reliable & Scalable
                </span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-white/25 rounded-full" />
              </span>{" "}
              <br />
              IT Solutions
            </h1>

            <p className="text-lg opacity-90 max-w-xl mb-10">
              We design, develop, and support modern IT systems that drive
              efficiency, security, and long-term growth.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                className="px-10 py-3 rounded-full bg-white text-horizon-orange fw-semibold shadow-xl hover:scale-105 transition"
              >
                View Services
              </a>
              <a
                href="#contact"
                className="px-10 py-3 rounded-full border border-white/50 text-white backdrop-blur hover:bg-white/10 transition"
              >
                Contact Us
              </a>
            </div>

            {/* MICRO STATS */}
            <div className="flex gap-8 text-sm text-white/85 flex-wrap">
              <span>✔ 5+ Years Experience</span>
              <span>✔ 120+ Projects</span>
              <span>✔ Enterprise-ready</span>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="col-lg-6 mt-24 mt-lg-0">
            <div className="perspective-[1800px] max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 120, rotateY: 18 }
                  }
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -120, rotateY: -18 }
                  }
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative bg-white/30 backdrop-blur-2xl rounded-[2.6rem] p-12 shadow-2xl text-white text-center cursor-grab active:cursor-grabbing"
                >
                  {/* ICON */}
                  <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-horizon-orange to-horizon-green flex items-center justify-center text-4xl shadow-xl">
                    {slides[index].icon}
                  </div>

                  <h3 className="text-2xl fw-bold mb-4">
                    {slides[index].title}
                  </h3>

                  <p className="opacity-90 mb-8 leading-relaxed">
                    {slides[index].desc}
                  </p>

                  <a
                    href={slides[index].target}
                    className="inline-block px-7 py-2.5 rounded-full bg-gradient-to-r from-horizon-orange to-horizon-amber text-white shadow"
                  >
                    Learn More →
                  </a>

                  {/* PROGRESS BAR */}
                  {!paused && (
                    <div className="mt-10 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.6, ease: "linear" }}
                        className="h-full bg-white/80 rounded-full"
                      />
                    </div>
                  )}

                  {/* DOTS */}
                  <div className="flex justify-center gap-3 mt-7">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`w-3 h-3 rounded-full transition ${
                          i === index
                            ? "bg-white scale-125"
                            : "bg-white/40 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
