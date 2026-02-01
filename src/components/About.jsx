import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ================= DATE LOGIC ================= */
const START_DATE = new Date("2025-09-25");
const yearsActive = Math.max(
  0,
  new Date().getFullYear() - START_DATE.getFullYear()
);

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

/* ================= COUNT UP ================= */
function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const duration = 700;
    const step = 16;
    const increment = end / (duration / step || 1);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ================= FLIP CARD ================= */
function FlipCard({ icon, title, desc }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="relative h-40 w-full text-left focus:outline-none"
      style={{ perspective: 1200 }}
      aria-pressed={flipped}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-gray-100
                     rounded-2xl p-6 shadow-sm
                     flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-3xl mb-2">{icon}</div>
          <h4 className="font-semibold">{title}</h4>
          <span className="mt-2 text-xs text-gray-400">
            Tap to flip
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-horizon-orange text-white
                     rounded-2xl p-6 shadow-sm
                     flex items-center justify-center text-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      </motion.div>
    </button>
  );
}

export default function About() {
  const values = [
    {
      icon: "🎯",
      title: "Mission",
      desc: "Deliver secure, scalable, and reliable digital solutions for growing organizations.",
    },
    {
      icon: "🌍",
      title: "Vision",
      desc: "Become a trusted long-term technology partner built on quality and trust.",
    },
    {
      icon: "💡",
      title: "Innovation",
      desc: "Design systems today that remain relevant and effective tomorrow.",
    },
    {
      icon: "🤝",
      title: "Commitment",
      desc: "Operate with consistency, transparency, and accountability in every project.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 lg:py-36
                 bg-gradient-to-b from-white via-horizon-yellow/10 to-white"
    >
      <div className="container">
        {/* ================= HEADER ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <span className="inline-flex items-center gap-2 mb-5 px-6 py-2
                           rounded-full bg-horizon-orange/10
                           text-horizon-orange text-sm font-semibold">
            🚀 Established September 25, 2025
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl
                         font-extrabold leading-tight mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-horizon-orange to-horizon-yellow
                             bg-clip-text text-transparent">
              NEXGEN 9 IT Solutions
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg">
            We craft reliable, scalable, and future-ready IT solutions that help
            organizations grow with confidence.
          </p>
        </motion.div>

        {/* ================= BALANCED TWO COLUMNS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start relative">

          {/* divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-gray-100" />

          {/* ================= LEFT ================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold mb-4">
                Who We Are
              </motion.h3>

              <motion.p variants={fadeUp} className="text-lg text-gray-700 mb-4">
                NEXGEN 9 IT Solutions was founded with a single focus — building
                dependable digital systems that scale as businesses evolve.
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-600">
                We believe great technology starts with strong foundations,
                thoughtful architecture, and long-term collaboration.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { value: <CountUp end={yearsActive} />, label: "Years Active" },
                { value: <CountUp end={5} suffix="+" />, label: "Ongoing Projects" },
                { value: "Growing", label: "Clients & Partners" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white border border-gray-100
                             rounded-2xl p-6 shadow-sm"
                >
                  <h4 className="text-3xl font-bold text-horizon-orange mb-1">
                    {item.value}
                  </h4>
                  <p className="text-xs tracking-widest text-gray-500 uppercase">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT (STICKY) ================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-12 lg:sticky lg:top-28"
          >
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold mb-6">
                Our Journey
              </motion.h3>

              <div className="space-y-5">
                {[
                  ["2025", "Company Founded"],
                  ["2026", "Enterprise Projects Delivered"],
                  ["2027", "Expansion & Partnerships"],
                ].map(([year, title], i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-4">
                    <span className="w-3 h-3 mt-2 bg-horizon-orange rounded-full" />
                    <div>
                      <p className="text-sm font-bold">{year}</p>
                      <p className="text-gray-600">{title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <FlipCard key={i} {...v} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
