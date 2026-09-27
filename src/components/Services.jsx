'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Smartphone,
  Globe2,
  Cloud,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

/* ================= SERVICES DATA ================= */
const services = [
  {
    id: "software",
    category: "Engineering",
    title: "Custom Enterprise Software",
    desc: "Tailored software systems engineered to automate complex workflows, eliminate operational friction, and scale with your company.",
    icon: Code2,
    accent: "from-horizon-orange to-horizon-amber",
    glow: "rgba(236,143,94,0.3)",
    tags: ["Custom Business Logic", "ERP / CRM Systems", "Automated Workflows"],
  },
  {
    id: "web-apps",
    category: "Engineering",
    title: "High-Performance Web & SaaS",
    desc: "Lightning-fast, accessible web platforms built with React, Next.js, and modern APIs with seamless real-time interactivity.",
    icon: Globe2,
    accent: "from-horizon-amber to-horizon-yellow",
    glow: "rgba(243,182,100,0.3)",
    tags: ["SaaS Architecture", "Real-Time Sync", "Progressive Web Apps"],
  },
  {
    id: "mobile",
    category: "Engineering",
    title: "Mobile App Development",
    desc: "Fluid, cross-platform iOS and Android applications delivering native performance, responsive gestures, and offline-first capabilities.",
    icon: Smartphone,
    accent: "from-horizon-yellow to-horizon-green",
    glow: "rgba(241,235,144,0.3)",
    tags: ["iOS & Android", "Offline First", "Push Notifications"],
  },
  {
    id: "cloud",
    category: "Cloud & Security",
    title: "Cloud Infrastructure & DevOps",
    desc: "Resilient cloud architectures deployed on AWS and modern container clusters with automated CI/CD and zero-downtime rollouts.",
    icon: Cloud,
    accent: "from-horizon-green to-horizon-orange",
    glow: "rgba(159,187,115,0.3)",
    tags: ["AWS / Docker", "CI/CD Pipelines", "Auto-Scaling"],
  },
  {
    id: "integration",
    category: "Engineering",
    title: "Systems & API Integration",
    desc: "Seamless connectivity connecting disparate databases, legacy systems, payment gateways, and third-party APIs into one unified engine.",
    icon: Layers,
    accent: "from-horizon-orange to-horizon-green",
    glow: "rgba(236,143,94,0.3)",
    tags: ["REST / GraphQL", "Payment Systems", "Webhook Automation"],
  },
  {
    id: "security",
    category: "Cloud & Security",
    title: "Cybersecurity & Data Governance",
    desc: "End-to-end security audits, identity management, zero-trust controls, and compliance governance to safeguard your critical data.",
    icon: ShieldCheck,
    accent: "from-horizon-amber to-horizon-orange",
    glow: "rgba(243,182,100,0.3)",
    tags: ["Data Encryption", "Zero-Trust", "Vulnerability Auditing"],
  },
];

const categories = ["All", "Engineering", "Cloud & Security"];

/* ================= 3D TILT SERVICE CARD ================= */
const ServiceCard = ({ service }) => {
  const reduceMotion = useReducedMotion();
  const Icon = service.icon;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smoothX = useSpring(mx, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 300], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 300], [-6, 6]);

  const cardGlow = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(320px at ${x}px ${y}px, ${service.glow}, transparent 80%)`
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
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative group rounded-3xl p-[1px] transition-all duration-300"
    >
      {/* AMBIENT BORDER GRADIENT */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
      />

      {/* CARD BODY */}
      <motion.div
        style={{ background: cardGlow }}
        className="relative h-full flex flex-col justify-between bg-zinc-950/80 backdrop-blur-2xl rounded-3xl p-7 sm:p-8 border border-white/10 group-hover:border-white/25 shadow-xl shadow-black/60 transition-colors"
      >
        <div>
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-black shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>

            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-zinc-400 group-hover:text-horizon-amber group-hover:border-horizon-amber/30 transition-colors">
              {service.category}
            </span>
          </div>

          {/* TITLE & DESCRIPTION */}
          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-horizon-amber transition-colors">
            {service.title}
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {service.desc}
          </p>
        </div>

        {/* TAGS */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-full bg-white/[0.04] text-zinc-300 border border-white/5 group-hover:border-white/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ================= MAIN SERVICES SECTION ================= */
export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px at ${x}px ${y}px, rgba(236,143,94,0.15), transparent 80%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      onMouseMove={handleMove}
      className="relative py-28 lg:py-36 bg-black text-white overflow-hidden"
    >
      {/* CURSOR GLOW */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glow }}
        />
      )}

      {/* AMBIENT BACKLIGHTS */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-horizon-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-horizon-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER & FILTER ROW */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-horizon-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
                Capabilities & Services
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Engineered For Scalability,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
                Built For Performance
              </span>
            </h2>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 shrink-0 self-start lg:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-md shadow-orange-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES GRID */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM ACTION BANNER */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Need a custom tailored solution?
            </h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              From end-to-end architectural overhauls to specialized software builds, our engineers are ready to execute your vision.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Schedule a Technical Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}