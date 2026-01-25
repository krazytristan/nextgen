import { motion } from "framer-motion";

/* ================= DATE LOGIC ================= */
const START_DATE = new Date("2026-01-25");
const currentYear = new Date().getFullYear();
const yearsActive = Math.max(0, currentYear - START_DATE.getFullYear());

/* ================= ANIMATION VARIANTS ================= */
const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-horizon-yellow/20 to-white"
    >
      {/* Background accents */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-horizon-green/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-260px] left-[-260px] w-[620px] h-[620px] bg-horizon-orange/20 rounded-full blur-[160px]" />

      <div className="relative container">
        {/* ================= HEADER ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-medium">
            Established January 25, 2026
          </span>

          <h2 className="text-5xl fw-bold mb-5 leading-tight">
            Building the Future of{" "}
            <span className="text-horizon-orange">IT Solutions</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Horizon for IT Solutions is a newly established technology company
            dedicated to building secure, scalable, and future-ready systems
            for modern organizations.
          </p>
        </motion.div>

        {/* ================= STATS STRIP ================= */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-28 text-center"
        >
          {[
            [`${yearsActive}+`, "Years Active"],
            ["Ongoing", "Projects in Development"],
            ["Growing", "Early Clients & Partners"],
          ].map(([value, label], i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40"
            >
              <h3 className="text-4xl fw-bold text-horizon-orange mb-2">
                {value}
              </h3>
              <p className="text-gray-600">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= CONTENT ================= */}
        <div className="row g-5 align-items-center mb-28">
          {/* LEFT — STORY */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-lg-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-gray-700 mb-6"
            >
              Horizon was founded on January 25, 2026 with a clear mission:
              to create IT solutions that are practical, reliable, and built
              with long-term sustainability in mind.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed text-gray-700 mb-10"
            >
              As a modern IT solutions provider, we focus on strong foundations,
              clean architecture, and partnerships that grow alongside our
              clients.
            </motion.p>

            {/* Principles */}
            <motion.div variants={stagger} className="space-y-5">
              {[
                [
                  "Founded with clarity",
                  "A clear roadmap focused on quality and growth",
                ],
                [
                  "Built for the future",
                  "Scalable systems designed from day one",
                ],
                [
                  "Trust-first mindset",
                  "Transparent collaboration and dependable delivery",
                ],
              ].map(([title, desc], i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-5"
                >
                  <div className="mt-2 w-3 h-3 rounded-full bg-horizon-orange flex-shrink-0" />
                  <div>
                    <h4 className="fw-semibold mb-1">{title}</h4>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — VALUE CARDS */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-lg-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {[
                {
                  title: "Our Mission",
                  desc: "Deliver secure, scalable, and future-ready IT solutions.",
                  icon: "🎯",
                },
                {
                  title: "Our Vision",
                  desc: "Grow into a trusted long-term technology partner.",
                  icon: "🌍",
                },
                {
                  title: "Our Values",
                  desc: "Integrity, innovation, reliability, and accountability.",
                  icon: "💡",
                },
                {
                  title: "Our Commitment",
                  desc: "Strong foundations, consistent delivery, and continuous improvement.",
                  icon: "🤝",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-xl border border-white/40"
                >
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="fw-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= CLOSING ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl fw-bold mb-4">
            Just Getting Started — Built to Last
          </h3>
          <p className="text-lg text-gray-600">
            Horizon for IT Solutions is at the beginning of its journey,
            focused on building strong partnerships, solid systems, and
            long-term value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
