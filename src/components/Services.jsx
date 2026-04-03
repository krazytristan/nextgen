'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ================= SERVICES DATA ================= */
const services = [
  {
    title: "Custom Software Development",
    desc: "Tailored systems engineered to solve real operational problems.",
    icon: "⚙️",
    accent: "from-horizon-orange to-horizon-amber",
    glow: "rgba(255,165,0,0.25)",
    tags: ["Custom Logic", "Scalable", "Business-Focused"],
  },
  {
    title: "Web & Mobile Applications",
    desc: "Fast, responsive applications designed with modern UX principles.",
    icon: "📱",
    accent: "from-horizon-amber to-horizon-green",
    glow: "rgba(255,200,0,0.25)",
    tags: ["Web Apps", "Mobile", "UX/UI"],
  },
  {
    title: "Systems Integration",
    desc: "Connecting platforms, data, and workflows into one ecosystem.",
    icon: "🔗",
    accent: "from-horizon-green to-horizon-orange",
    glow: "rgba(0,255,150,0.25)",
    tags: ["APIs", "Automation", "Data Flow"],
  },
  {
    title: "Cybersecurity",
    desc: "Protection for systems, networks, and data against modern digital threats.",
    icon: "🔐",
    accent: "from-horizon-green to-horizon-amber",
    glow: "rgba(0,255,150,0.25)",
    tags: ["Security", "Protection", "Compliance"],
  },
];

/* ================= MAIN ================= */

export default function Services() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  const [paused, setPaused] = useState(false);

  /* GLOBAL CURSOR GLOW */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px at ${x}px ${y}px, rgba(255,165,0,0.15), transparent 80%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* AUTO SCROLL */
  useEffect(() => {
    if (reduceMotion || paused) return;

    const el = containerRef.current;
    if (!el) return;

    let raf;
    let last = performance.now();

    const loop = (now) => {
      const delta = now - last;
      last = now;

      el.scrollTop += delta * 0.04;

      if (el.scrollTop >= el.scrollHeight / 2) {
        el.scrollTop -= el.scrollHeight / 2;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, paused]);

  return (
    <section
      id="services"
      onMouseMove={handleMove}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden
                 bg-gradient-to-b from-white via-horizon-yellow/30 to-white"
    >

      {/* 🔥 CURSOR SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: glow }}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <span className="inline-block mb-5 px-5 py-2 rounded-full
                               bg-horizon-orange/10 text-horizon-orange text-sm font-semibold">
                Our Services
              </span>

              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px]
                             font-extrabold leading-tight mb-6">
                Solutions Built for{" "}
                <span className="text-horizon-orange">
                  Modern Businesses
                </span>
              </h2>

              <p className="text-gray-600 text-[16px] sm:text-[17px] lg:text-[18px]
                            leading-relaxed max-w-md">
                We deliver scalable, secure, and future-ready IT solutions
                designed to support real business growth.
              </p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-8">
            <div className="relative h-[520px] sm:h-[560px] overflow-hidden">

              {/* FADE */}
              <div className="pointer-events-none absolute top-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 w-full h-28 bg-gradient-to-t from-white to-transparent z-10" />

              <motion.div
                ref={containerRef}
                className="h-full overflow-y-scroll pr-3 space-y-6 cursor-grab"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >

                <div className="space-y-6 pb-28">

                  {[...services, ...services].map((service, i) => {

                    const mx = useMotionValue(0);
                    const my = useMotionValue(0);

                    const rotateX = useTransform(my, [0, 300], [10, -10]);
                    const rotateY = useTransform(mx, [0, 300], [-10, 10]);

                    const cardGlow = useTransform(
                      [mx, my],
                      ([x, y]) =>
                        `radial-gradient(300px at ${x}px ${y}px, ${service.glow}, transparent 80%)`
                    );

                    return (
                      <motion.div
                        key={i}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          mx.set(e.clientX - rect.left);
                          my.set(e.clientY - rect.top);
                        }}
                        style={{
                          rotateX,
                          rotateY,
                          transformPerspective: 1000,
                        }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="relative group rounded-[2rem] p-[1px]"
                      >

                        {/* BORDER GLOW */}
                        <div className={`absolute inset-0 rounded-[2rem]
                          bg-gradient-to-r ${service.accent}
                          opacity-0 group-hover:opacity-100 blur-xl transition`} />

                        {/* CARD */}
                        <motion.div
                          style={{ background: cardGlow }}
                          className="relative flex gap-6
                            bg-white/80 backdrop-blur-xl
                            rounded-[2rem] p-7 sm:p-8
                            border border-white/50
                            shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
                        >

                          {/* ICON */}
                          <motion.div
                            whileHover={{ scale: 1.25, rotate: 8 }}
                          >
                            <div className={`w-14 h-14 rounded-xl
                              bg-gradient-to-br ${service.accent}
                              text-white flex items-center justify-center text-2xl shadow-lg`}>
                              {service.icon}
                            </div>
                          </motion.div>

                          {/* CONTENT */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-horizon-orange">
                              {service.title}
                            </h4>

                            <p className="text-gray-600 mb-4">
                              {service.desc}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {service.tags.map((tag, t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 text-xs rounded-full
                                             bg-white/70 border border-gray-200
                                             hover:bg-horizon-orange hover:text-white transition"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                        </motion.div>
                      </motion.div>
                    );
                  })}

                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}