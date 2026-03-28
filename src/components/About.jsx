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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
};

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

/* ================= COUNT ================= */
function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (t) => {
      const progress = Math.min((t - start) / 1200, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ================= VALUE CARD ================= */
function ValueCard({ title, desc, icon: Icon }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="relative rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl"
    >
      <div className="text-horizon-orange mb-4"><Icon /></div>
      <h4 className="font-semibold text-lg mb-2 text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const START_DATE = new Date("2025-09-25");

  const yearsActive = useMemo(() => {
    return Math.max(0, new Date().getFullYear() - START_DATE.getFullYear());
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 40%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const values = [
    { title: "Mission", desc: "Deliver scalable and secure IT solutions that drive business growth.", icon: Icons.Target },
    { title: "Vision", desc: "To become a leading provider of innovative and future-ready IT services.", icon: Icons.Zap },
    { title: "Innovation", desc: "We continuously adapt and integrate modern technologies.", icon: Icons.Shield },
    { title: "Commitment", desc: "Dedicated to quality, transparency, and long-term partnerships.", icon: Icons.Users },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >

      {/* 🔥 IMAGE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg-tech.png"
          alt="background"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

        {/* GLOW */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-horizon-orange/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-horizon-yellow/20 blur-[120px]" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="max-w-3xl mb-20">
          <span className="text-horizon-orange font-semibold text-sm">
            Established September 25, 2025
          </span>

          <h2 className="text-[40px] font-extrabold mt-4 mb-6">
            About <span className="text-horizon-orange">NEXGEN IT Solutions</span>
          </h2>

          <p className="text-gray-700 leading-relaxed">
            NEXGEN IT Solutions is dedicated to delivering cutting-edge digital solutions that empower businesses to thrive in a fast-evolving technological landscape. We specialize in building scalable systems, cloud-based infrastructure, and innovative applications that enhance efficiency, security, and long-term growth.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Our team focuses on combining strategic planning, advanced engineering, and continuous support to ensure every solution we deliver remains relevant, reliable, and future-ready.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">

          {/* TIMELINE */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-gray-300">
            <motion.div
              className="absolute top-0 w-full bg-horizon-orange"
              style={{ scaleY: reduceMotion ? 1 : lineScale }}
            />
          </div>

          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" className="space-y-16">

            <div>
              <h3 className="text-xl font-bold mb-6">Our Approach</h3>

              {[
                { t: "Strategy", d: "Aligning IT solutions with business goals." },
                { t: "Engineering", d: "Building robust and scalable systems." },
                { t: "Maintenance", d: "Ensuring continuous optimization and support." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4 mb-6">
                  <div className="w-8 h-8 bg-horizon-orange/10 text-horizon-orange flex items-center justify-center rounded-full font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{item.t}</p>
                    <p className="text-sm text-gray-600">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/80 p-5 rounded-xl text-center backdrop-blur">
                <CountUp end={yearsActive} />
                <p className="text-xs">Years</p>
              </div>
              <div className="bg-white/80 p-5 rounded-xl text-center backdrop-blur">
                <CountUp end={10} suffix="+" />
                <p className="text-xs">Solutions</p>
              </div>
              <div className="bg-white/80 p-5 rounded-xl text-center backdrop-blur">
                Growing
                <p className="text-xs">Clients</p>
              </div>
            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => <ValueCard key={i} {...v} />)}
          </motion.div>

        </div>
      </div>
    </section>
  );
}