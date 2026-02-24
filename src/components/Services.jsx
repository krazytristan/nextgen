import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    if (reduceMotion || paused) return;

    const el = containerRef.current;
    if (!el) return;

    let raf;
    let last = performance.now();
    const speed = 0.03;

    const loop = (now) => {
      const delta = now - last;
      last = now;

      el.scrollTop += delta * speed;

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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden
                 bg-gradient-to-b from-white via-horizon-yellow/30 to-white"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

          {/* ================= LEFT INTRO ================= */}
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

          {/* ================= RIGHT — SWIPE LIST ================= */}
          <div className="lg:col-span-8">
            <div className="relative h-[520px] sm:h-[560px] overflow-hidden">

              {/* FADE MASKS */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent z-10" />

              <motion.div
                ref={containerRef}
                drag="y"
                dragConstraints={{ top: -100000, bottom: 0 }}
                dragElastic={0.04}
                onDragStart={() => setPaused(true)}
                onDragEnd={() => setPaused(false)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="h-full overflow-y-scroll pr-3 space-y-6
                           cursor-grab active:cursor-grabbing"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                <div className="space-y-6 pb-28">
                  {[...services, ...services].map((service, i) => (
                    <motion.div
                      key={i}
                      whileHover={
                        !reduceMotion
                          ? { scale: 1.02, y: -4 }
                          : {}
                      }
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="group relative flex gap-6
                                 bg-white/80 backdrop-blur-xl
                                 rounded-[2.2rem] p-7 sm:p-8
                                 shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                                 border border-white/50"
                    >
                      {/* ACCENT STRIP */}
                      <div
                        className={`absolute left-0 top-0 h-full w-1.5
                                    rounded-l-[2.2rem]
                                    bg-gradient-to-b ${service.accent}`}
                      />

                      {/* ICON */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-14 h-14 rounded-2xl
                                      bg-gradient-to-br ${service.accent}
                                      text-white flex items-center
                                      justify-center text-2xl shadow-md`}
                        >
                          {service.icon}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-[18px] sm:text-[20px] mb-2
                                       group-hover:text-horizon-orange transition">
                          {service.title}
                        </h4>

                        <p className="text-gray-600 text-[15px] sm:text-[16px]
                                      leading-relaxed mb-4 max-w-xl">
                          {service.desc}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full
                                         text-xs bg-gray-100 text-gray-600
                                         tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}