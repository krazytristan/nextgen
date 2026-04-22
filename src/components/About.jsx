'use client';

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ================= ICONS ================= */
const Icons = {
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
};

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

/* ================= DATA ================= */
const VALUES = [
  { title: "Mission", desc: "Deliver scalable and secure IT solutions that drive business growth.", icon: Icons.Target },
  { title: "Vision", desc: "To become a leading provider of innovative and future-ready IT services.", icon: Icons.Zap },
  { title: "Innovation", desc: "We integrate modern technologies continuously.", icon: Icons.Shield },
  { title: "Commitment", desc: "Focused on quality and long-term partnerships.", icon: Icons.Users },
];

const STEPS = [
  { t: "Strategy", d: "Align tech with business goals." },
  { t: "Engineering", d: "Build scalable and high-performance systems." },
  { t: "Maintenance", d: "Continuous monitoring and improvement." },
];

/* ================= COMPONENTS ================= */

function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ValueCard({ title, desc, icon: Icon }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 opacity-0 group-hover:opacity-30 blur-xl transition" />

      <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-md hover:shadow-xl transition">
        <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-xl mb-4">
          <Icon />
        </div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-gray-600 text-sm mt-2">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ================= MAIN ================= */
export default function About() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const years = useMemo(() => {
    const start = new Date("2025-09-25").getTime();
    return Math.max(0, Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24 * 365)));
  }, []);

  return (
    <section ref={ref} id="about" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-black mb-6">
            Digital Excellence
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-600 max-w-xl">
            Nexgen IT Solutions builds scalable and modern systems for businesses.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <div className="space-y-8">
              {STEPS.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border rounded-full font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold">{s.t}</h4>
                    <p className="text-gray-600 text-sm">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mt-10 text-center font-bold text-lg">
              <div><CountUp end={years}/> yrs</div>
              <div><CountUp end={15}/>+</div>
              <div><CountUp end={99}/> %</div>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-2 gap-4"
          >
            {VALUES.map((v, i) => (
              <ValueCard key={i} {...v} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}