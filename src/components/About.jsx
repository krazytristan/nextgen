'use client';

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  Target,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

/* ================= DATA ================= */
const VALUES = [
  {
    title: "Mission",
    desc: "Deliver scalable, high-performance IT solutions that accelerate enterprise growth and resilience.",
    icon: Target,
    accent: "from-horizon-orange to-horizon-amber",
  },
  {
    title: "Vision",
    desc: "To be the premier digital engineering partner known for future-ready architectures and craft.",
    icon: Zap,
    accent: "from-horizon-amber to-horizon-yellow",
  },
  {
    title: "Innovation",
    desc: "We continuously integrate modern toolchains, AI integrations, and cloud-native practices.",
    icon: Sparkles,
    accent: "from-horizon-yellow to-horizon-green",
  },
  {
    title: "Security & Trust",
    desc: "Zero-trust architecture, robust encryption, and reliable compliance engineered into every layer.",
    icon: ShieldCheck,
    accent: "from-horizon-green to-horizon-orange",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Strategic Discovery",
    desc: "We analyze your operational bottlenecks, business objectives, and architectural requirements to design a tailored roadmap.",
  },
  {
    num: "02",
    title: "Precision Engineering",
    desc: "Our agile teams develop clean, maintainable systems using modern frameworks, continuous integration, and rigorous testing.",
  },
  {
    num: "03",
    title: "Deployment & Scale",
    desc: "Automated cloud deployment with zero-downtime pipelines, ongoing telemetry monitoring, and proactive support.",
  },
];

/* ================= COMPONENTS ================= */
function CountUp({ end, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId;
    let start;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, end]);

  return <span ref={ref}>{isInView ? count : 0}{suffix}</span>;
}

function ValueCard({ title, desc, icon: Icon, accent }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group rounded-3xl p-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-horizon-amber/40 shadow-xl transition-all duration-300"
    >
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-black mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 stroke-[2.2]" />
      </div>

      <h4 className="font-bold text-lg text-white mb-2 group-hover:text-horizon-amber transition-colors">
        {title}
      </h4>
      <p className="text-zinc-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

/* ================= MAIN ABOUT ================= */
export default function About() {
  const ref = useRef(null);

  const years = useMemo(() => {
    const start = new Date("2024-01-01").getTime();
    return Math.max(1, Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24 * 365)));
  }, []);

  return (
    <section ref={ref} id="about" className="relative py-28 lg:py-36 bg-zinc-950 text-white overflow-hidden">
      {/* BACKGROUND ACCENT LIGHTING */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-horizon-orange/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-horizon-amber/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER SECTION (SCROLL UP & DOWN ANIMATION) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-horizon-amber" />
            <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
              About Horizon IT
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Architecting Systems That Drive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
              Real Impact
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            We are a tech-driven digital solutions firm committed to turning complex business challenges into resilient, scalable, and user-centric software systems.
          </motion.p>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: HOW WE WORK (STEPS & STATS) */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">
                Our Engineering Philosophy
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Every line of code and infrastructure component we build is designed for longevity, security, and effortless scaling.
              </p>

              {/* STEP CARDS (SCROLL ANIMATED) */}
              <div className="space-y-4">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="flex gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-horizon-orange/20 to-horizon-amber/20 border border-horizon-amber/30 text-horizon-amber flex items-center justify-center font-black text-sm shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base mb-1">{step.title}</h4>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* KEY METRICS DISPLAY (SCROLL ANIMATED) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-4 p-6 rounded-3xl bg-zinc-900/60 border border-white/10 text-center"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-black text-horizon-amber">
                  <CountUp end={years} />+
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">Years Running</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-3xl sm:text-4xl font-black text-white">
                  <CountUp end={50} />+
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">Projects Built</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-horizon-green">
                  <CountUp end={100} />%
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">Client Trust</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: CORE VALUES GRID (SCROLL ANIMATED) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">
                What Sets Us Apart
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                We operate at the intersection of engineering rigor, modern UI aesthetics, and enterprise dependability.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {VALUES.map((val, i) => (
                <ValueCard key={i} {...val} />
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}