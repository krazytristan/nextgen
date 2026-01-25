import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

/* ================= TEAM DATA ================= */
const team = [
  {
    name: "Tristan Jorge Cuartero",
    role: "Project Leader",
    category: "Leadership",
    bio: "Oversees architecture, planning, and overall system development.",
    email: "tristan.cuartero@horizonit.com",
    github: "https://github.com/krazytristan",
    linkedin: "https://www.linkedin.com/in/tristan-jorge-cuartero/",
    website: "https://personal-website-sage-tau.vercel.app/",
    image: "/team/tristan.png",
    skills: [
      { name: "System Architecture", level: 90 },
      { name: "React", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Project Management", level: 95 },
    ],
  },
  {
    name: "Joseph Rendon Cubio",
    role: "Backend Programmer",
    category: "Backend",
    bio: "Handles backend logic, databases, and API integrations.",
    email: "joseph.cubio@horizonit.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://portfolio.joseph.dev",
    image: "/team/cubio.png",
    skills: [
      { name: "PHP", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "API Development", level: 75 },
    ],
  },
  {
    name: "Karlo Keiryl Pitman",
    role: "Backend Programmer",
    category: "Backend",
    bio: "Focuses on system optimization and application logic.",
    email: "karlo.pitman@horizonit.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://portfolio.karlo.dev",
    image: "/team/karlo.jpg",
    skills: [
      { name: "JavaScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Database Design", level: 78 },
    ],
  },
  {
    name: "Marvin Paul Orozco",
    role: "Frontend Developer",
    category: "Frontend",
    bio: "Designs and builds modern, responsive user interfaces.",
    email: "marvin.orozco@horizonit.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://portfolio.marvin.dev",
    image: "/team/marvin.png",
    skills: [
      { name: "HTML / CSS", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "React", level: 82 },
      { name: "UI/UX Design", level: 80 },
    ],
  },
];

const filters = ["All", "Leadership", "Frontend", "Backend"];

export default function Team() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredTeam =
    activeFilter === "All"
      ? team
      : team.filter((m) => m.category === activeFilter);

  return (
    <>
      {/* ================= TEAM SECTION ================= */}
      <section
        id="team"
        className="relative py-32 bg-gradient-to-b from-white via-horizon-yellow/20 to-white"
      >
        <div className="container relative">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-medium">
              Our Team
            </span>
            <h2 className="text-5xl fw-bold mb-4">
              Meet the <span className="text-horizon-orange">Experts</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A cross-functional team delivering scalable and future-ready IT
              solutions.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex justify-center gap-3 mb-20 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === f
                    ? "bg-horizon-orange text-white shadow-md"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredTeam.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setSelected(member)}
                className="group relative bg-white rounded-[28px] shadow-xl cursor-pointer overflow-hidden"
              >
                {/* HEADER */}
                <div className="relative h-44 bg-gradient-to-br from-horizon-orange to-horizon-green">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-32 h-32 rounded-3xl object-cover border-[5px] border-white shadow-xl group-hover:scale-105 transition"
                  />
                </div>

                {/* BODY */}
                <div className="pt-20 pb-8 px-6 text-center">
                  <h5 className="fw-bold text-lg mb-1">
                    {member.name}
                  </h5>

                  <p className="text-horizon-orange fw-medium mb-3">
                    {member.role}
                  </p>

                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                    {member.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROFILE MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelected(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-horizon-orange"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>

                {/* IMAGE */}
                <div className="flex justify-center mb-6">
                  <div className="p-1 rounded-3xl bg-gradient-to-br from-horizon-orange to-horizon-green">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-36 h-36 rounded-3xl object-cover bg-white"
                    />
                  </div>
                </div>

                <h3 className="fw-bold text-2xl text-center">
                  {selected.name}
                </h3>
                <p className="text-horizon-orange fw-medium text-center mb-3">
                  {selected.role}
                </p>
                <p className="text-gray-600 text-center mb-8">
                  {selected.bio}
                </p>

                {/* SOCIALS */}
                <div className="flex justify-center gap-4 mb-10">
                  <Icon href={`mailto:${selected.email}`} icon={faEnvelope} />
                  <Icon href={selected.github} icon={faGithub} />
                  <Icon href={selected.linkedin} icon={faLinkedin} />
                  <Icon href={selected.website} icon={faGlobe} />
                </div>

                {/* SKILLS */}
                <div className="space-y-5">
                  {selected.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span className="fw-medium">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-horizon-orange to-horizon-green rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= ICON ================= */
function Icon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shadow hover:bg-horizon-orange hover:text-white transition"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
