'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ================= DATA ================= */
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
    desc: "Fast, responsive applications designed with modern UX.",
    icon: "📱",
    accent: "from-horizon-amber to-horizon-green",
    glow: "rgba(255,200,0,0.25)",
    tags: ["Web Apps", "Mobile", "UX/UI"],
  },
  {
    title: "Systems Integration",
    desc: "Connecting platforms into one ecosystem.",
    icon: "🔗",
    accent: "from-horizon-green to-horizon-orange",
    glow: "rgba(0,255,150,0.25)",
    tags: ["APIs", "Automation", "Data Flow"],
  },
  {
    title: "Cybersecurity",
    desc: "Advanced protection for systems and data.",
    icon: "🔐",
    accent: "from-horizon-green to-horizon-amber",
    glow: "rgba(0,255,150,0.25)",
    tags: ["Security", "Protection", "Compliance"],
  },
];

/* ================= CARD ================= */
const ServiceCard = ({ service }) => {
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smoothX = useSpring(mx, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 300], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 300], [-8, 8]);

  const glow = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(250px at ${x}px ${y}px, ${service.glow}, transparent 80%)`
  );

  const handleMove = (e) => {
    if (reduceMotion || window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      style={!reduceMotion ? { rotateX, rotateY, transformPerspective: 1000 } : {}}
      whileHover={{ scale: 1.03 }}
      className="relative group rounded-3xl p-[1px]"
    >
      {/* BORDER GLOW */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 blur-xl transition`} />

      {/* CARD */}
      <motion.div
        style={{ background: glow }}
        className="relative flex gap-5 bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl"
      >
        {/* ICON */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-white text-xl`}>
          {service.icon}
        </div>

        {/* CONTENT */}
        <div>
          <h4 className="font-bold text-lg mb-1 group-hover:text-horizon-orange transition">
            {service.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3">{service.desc}</p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ================= MAIN ================= */
export default function Services() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px at ${x}px ${y}px, rgba(255,165,0,0.12), transparent 80%)`
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

    const loop = () => {
      el.scrollTop += 0.4;

      if (el.scrollTop >= el.scrollHeight / 2) {
        el.scrollTop = 0;
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
      className="relative py-28 bg-gradient-to-b from-white via-orange-50 to-white overflow-hidden"
    >
      {/* CURSOR GLOW */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glow }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="lg:sticky top-32">
          <h2 className="text-4xl font-black mb-6">
            Our Services
          </h2>
          <p className="text-gray-600">
            We build scalable systems designed for real business growth.
          </p>
        </div>

        {/* RIGHT */}
        <div
          ref={containerRef}
          className="h-[500px] overflow-y-auto space-y-6 pr-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...services, ...services].map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}