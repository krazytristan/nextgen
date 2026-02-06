import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ================= DATE LOGIC ================= */
const START_DATE = new Date("2025-09-25");
const yearsActive = Math.max(
  0,
  new Date().getFullYear() - START_DATE.getFullYear()
);

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.15 } },
};

/* ================= COUNT UP ================= */
function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) {
      setCount(end);
      return;
    }

    let current = 0;
    const duration = 900;
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
  }, [isInView, end, reduceMotion]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ================= FLIP + TILT CARD ================= */
function FlipCard({ icon, title, desc }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={() => setFlipped((v) => !v)}
      whileHover={
        !reduceMotion
          ? { rotateX: -6, rotateY: 6, scale: 1.02 }
          : {}
      }
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      className="relative h-48 w-full text-left focus:outline-none"
      style={{ perspective: 1200 }}
      aria-pressed={flipped}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-gray-100
                     rounded-2xl p-6 shadow-md
                     flex flex-col items-center justify-center text-center
                     hover:shadow-lg transition"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-4xl mb-3">{icon}</div>
          <h4 className="font-semibold tracking-tight">{title}</h4>
          <span className="mt-2 text-xs text-gray-400">
            Tap to explore
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-gradient-to-br
                     from-horizon-orange to-horizon-yellow
                     text-white rounded-2xl p-6 shadow-lg
                     flex items-center justify-center text-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <p className="text-sm leading-relaxed font-medium">
            {desc}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  /* ================= TIMELINE LINE ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const values = [
    { icon: "🎯", title: "Mission", desc: "Build secure, scalable, and resilient digital solutions that empower growth." },
    { icon: "🌍", title: "Vision", desc: "Be a long-term technology partner trusted for quality and consistency." },
    { icon: "💡", title: "Innovation", desc: "Create systems today that remain relevant tomorrow." },
    { icon: "🤝", title: "Commitment", desc: "Operate with transparency, accountability, and care." },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-28 lg:py-36
                 bg-gradient-to-b from-white via-horizon-yellow/10 to-white"
    >
      <div className="container relative">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-6 py-2
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
            We design future-ready IT systems that help organizations move faster,
            scale smarter, and operate with confidence.
          </p>
        </motion.div>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative">

          {/* TIMELINE LINE */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-gray-100">
            <motion.div
              className="absolute top-0 left-0 w-full bg-horizon-orange origin-top"
              style={{ scaleY: reduceMotion ? 1 : lineScale }}
            />
          </div>

          {/* LEFT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold mb-4">
                Who We Are
              </motion.h3>
              <motion.p variants={fadeUp} className="text-lg text-gray-700 mb-4">
                NEXGEN 9 IT Solutions exists to build dependable digital
                foundations for modern businesses.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600">
                We focus on long-term value, thoughtful architecture, and
                partnerships that last.
              </motion.p>
            </div>

            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold mb-6">
                How We Work
              </motion.h3>

              <div className="space-y-5">
                {[
                  ["🧠", "Discover", "We listen deeply to understand goals, risks, and users."],
                  ["🛠️", "Build", "We engineer scalable, secure, and maintainable systems."],
                  ["🚀", "Launch & Evolve", "We deploy, monitor, and continuously improve."],
                ].map(([icon, title, desc], i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="text-gray-600 text-sm">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: <CountUp end={yearsActive} />, label: "Years Active" },
                { value: <CountUp end={5} suffix="+" />, label: "Active Projects" },
                { value: "Growing", label: "Clients & Partners" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white border border-gray-100
                             rounded-2xl p-6 shadow-md hover:shadow-lg transition"
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

          {/* RIGHT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-14 lg:sticky lg:top-28"
          >
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold mb-6">
                Our Journey
              </motion.h3>

              <div className="space-y-6">
                {[
                  ["2025", "Company Founded"],
                  ["2026", "Enterprise Solutions Delivered"],
                  ["2027", "Regional Expansion"],
                ].map(([year, title], i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-4">
                    <motion.span
                      className="w-3 h-3 mt-2 bg-horizon-orange rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    />
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
