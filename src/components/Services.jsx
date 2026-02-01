import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

/* ================= SERVICES DATA ================= */
const services = [
  {
    title: "Custom Software Development",
    desc: "Tailored systems engineered to solve real operational problems.",
    icon: "⚙️",
    accent: "from-horizon-orange to-horizon-amber",
    tags: ["Custom Logic", "Scalable", "Business-Focused"],
  },
  {
    title: "Web & Mobile Applications",
    desc: "Fast, responsive applications designed with modern UX principles.",
    icon: "📱",
    accent: "from-horizon-amber to-horizon-green",
    tags: ["Web Apps", "Mobile", "UX/UI"],
  },
  {
    title: "Systems Integration",
    desc: "Connecting platforms, data, and workflows into one ecosystem.",
    icon: "🔗",
    accent: "from-horizon-green to-horizon-orange",
    tags: ["APIs", "Automation", "Data Flow"],
  },
  {
    title: "Web Development",
    desc: "High-performance, responsive websites and web applications built for scale and reliability.",
    icon: "🌐",
    accent: "from-horizon-orange to-horizon-amber",
    tags: ["React", "Responsive", "Performance"],
  },
  {
    title: "System Development",
    desc: "Custom systems engineered around real business workflows and operational needs.",
    icon: "🧠",
    accent: "from-horizon-amber to-horizon-green",
    tags: ["Automation", "Integration", "Custom Logic"],
  },
  {
    title: "IT Support",
    desc: "24/7 monitoring, maintenance, and technical support to keep systems running smoothly.",
    icon: "🛠️",
    accent: "from-horizon-green to-horizon-orange",
    tags: ["Monitoring", "Maintenance", "Support"],
  },
  {
    title: "Networking",
    desc: "Secure, fast, and scalable network infrastructure for growing organizations.",
    icon: "📡",
    accent: "from-horizon-orange to-horizon-green",
    tags: ["Infrastructure", "Security", "Scalability"],
  },
  {
    title: "Cloud Solutions",
    desc: "Cloud deployment, migration, optimization, and long-term cloud management.",
    icon: "☁️",
    accent: "from-horizon-amber to-horizon-orange",
    tags: ["Migration", "Hosting", "Optimization"],
  },
  {
    title: "Cybersecurity",
    desc: "Protection for systems, networks, and data against modern digital threats.",
    icon: "🔐",
    accent: "from-horizon-green to-horizon-amber",
    tags: ["Data Protection", "Risk Control", "Compliance"],
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE DETECTION ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-horizon-yellow/30 to-white"
    >
      <div className="container relative">
        <div className="row">
          {/* ================= LEFT INTRO ================= */}
          <div className="col-lg-4 mb-16 lg:mb-0">
            <div className="lg:sticky lg:top-36">
              <span className="inline-block mb-4 px-4 py-2 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-medium">
                Our Services
              </span>

              <h2 className="text-4xl md:text-5xl fw-bold leading-tight mb-6">
                Solutions Built for{" "}
                <span className="text-horizon-orange">Modern Businesses</span>
              </h2>

              <p className="text-lg text-gray-600 max-w-md">
                We deliver scalable, secure, and future-ready IT solutions
                designed to support real business growth.
              </p>
            </div>
          </div>

          {/* ================= RIGHT — AUTO SCROLL LIST ================= */}
          <div className="col-lg-8">
            <div
              className="relative h-[520px] overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* FADE MASKS */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />

              <motion.div
                animate={
                  reduceMotion || paused || isMobile
                    ? { y: 0 }
                    : { y: ["0%", "-50%"] }
                }
                transition={{
                  duration: 40,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="space-y-6"
              >
                {[...services, ...services].map((service, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group relative flex gap-6 bg-white/75 backdrop-blur-xl rounded-[2rem] p-7 shadow-xl border border-white/40 hover:shadow-2xl"
                  >
                    {/* ACCENT RAIL */}
                    <div
                      className={`absolute left-0 top-0 h-full w-1.5 rounded-l-[2rem] bg-gradient-to-b ${service.accent}`}
                    />

                    {/* ICON */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} text-white flex items-center justify-center text-2xl shadow`}
                      >
                        {service.icon}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h4 className="fw-bold text-xl mb-2 group-hover:text-horizon-orange transition">
                        {service.title}
                      </h4>

                      <p className="text-gray-600 mb-4 max-w-xl">
                        {service.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
