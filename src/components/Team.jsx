import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

/* ================= BADGE LOGIC ================= */
function getBadge(role = "") {
  const r = role.toLowerCase();

  if (r.includes("founder"))
    return { label: "Founder", color: "bg-horizon-orange text-white" };

  if (r.includes("lead"))
    return { label: "Lead", color: "bg-blue-600 text-white" };

  if (r.includes("support"))
    return { label: "Support", color: "bg-gray-600 text-white" };

  return null;
}

/* ================= DATA ================= */
const founder = {
  name: "Tristan Jorge Cuartero",
  role: "Founder & Quality Assurance",
  image: "/team/tristan.png",
  email: "tristan.cuartero@horizonit.com",
  github: "https://github.com/krazytristan",
  linkedin: "https://www.linkedin.com/in/tristan-jorge-cuartero/",
  website: "https://personal-website-sage-tau.vercel.app/",
};

const devTeam1 = [
  {
    name: "Rodolfo Guce III",
    role: "Co-Founder & Lead Programmer",
    image: "/team/rodolfo.jpg",
    email: "rodolfo.guce@horizonit.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://ratbu123.github.io/Portfolio/",
  },
  {
    name: "Florencio John Fonte III",
    role: "Project Leader",
    image: "/team/fonte.jpg",
    email: "florencio.fonte@horizonit.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ricky Dolor",
    role: "Frontend Developer",
    image: "/team/ricky.jpg",
    email: "dolorricky7@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://feitan12.github.io/portfolioo/",
  },
  {
    name: "John Mark Espiritu",
    role: "UI / UX Designer",
    image: "/team/johnmark.jpg",
    website: "https://portfolio.johnmark.dev",
  },
  {
    name: "Charles Lois Neil Viñalon",
    role: "Chief Marketing Officer",
    image: "/team/charles.jpg",
    linkedin: "https://linkedin.com",
  },
];

const devTeam2 = [
  {
    name: "Joseph Rendon Cubio",
    role: "Lead Programmer (Full Stack)",
    image: "/team/cubio.png",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Marvin Paul Orozco",
    role: "Frontend & Backend Developer",
    image: "/team/marvin.png",
    github: "https://github.com",
  },
  {
    name: "Kharlo Keizy Pitman",
    role: "Support Programmer",
    image: "/team/kharlo.png",
    email: "kharlo.pitman@horizonit.com",
  },
];

/* ================= MAIN ================= */
export default function Team() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <section
        id="team"
        className="relative py-28 lg:py-36
                   bg-gradient-to-b from-white via-horizon-yellow/10 to-white"
      >
        <div className="container">

          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex px-6 py-2 mb-6 rounded-full
                             bg-horizon-orange/10 text-horizon-orange
                             text-sm font-semibold">
              Our Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Leadership & <span className="text-horizon-orange">Teams</span>
            </h2>
            <p className="text-lg text-gray-600">
              A collaborative structure built on quality, trust, and innovation.
            </p>
          </div>

          {/* FOUNDER */}
          <div className="flex justify-center mb-24">
            <SmallCard member={founder} highlight onClick={setSelected} />
          </div>

          {/* TEAMS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            <TeamColumn title="Development Team 1" members={devTeam1} onSelect={setSelected} />
            <TeamColumn title="Development Team 2" members={devTeam2} onSelect={setSelected} />

          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="fixed inset-0 z-[60]
                         flex items-center justify-center p-6"
            >
              <div className="relative bg-white rounded-3xl
                              shadow-2xl max-w-md w-full p-8">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-horizon-orange"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>

                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-28 h-28 mx-auto rounded-2xl object-cover shadow mb-4"
                />

                <h3 className="font-bold text-xl text-center">
                  {selected.name}
                </h3>
                <p className="text-horizon-orange text-center text-sm mb-4">
                  {selected.role}
                </p>

                <div className="flex justify-center gap-3">
                  <Icon href={selected.email && `mailto:${selected.email}`} icon={faEnvelope} />
                  <Icon href={selected.github} icon={faGithub} />
                  <Icon href={selected.linkedin} icon={faLinkedin} />
                  <Icon href={selected.website} icon={faGlobe} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= TEAM COLUMN ================= */
function TeamColumn({ title, members, onSelect }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-8 text-center lg:text-left">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {members.map((m) => (
          <SmallCard key={m.name} member={m} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}

/* ================= SMALL CARD ================= */
function SmallCard({ member, onClick, highlight = false }) {
  const badge = getBadge(member.role);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick(member)}
      className={`cursor-pointer bg-white rounded-2xl border
                  ${highlight ? "border-horizon-orange/40 shadow-lg" : "border-gray-100 shadow-sm"}
                  px-5 py-6 flex gap-4 items-start`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-16 h-16 rounded-xl object-cover shadow"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold leading-tight">{member.name}</h4>
          {badge && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${badge.color}`}
            >
              {badge.label}
            </span>
          )}
        </div>

        <p className="text-sm text-horizon-orange">{member.role}</p>

        <div className="flex gap-2 mt-3">
          <Icon href={member.email && `mailto:${member.email}`} icon={faEnvelope} small />
          <Icon href={member.github} icon={faGithub} small />
          <Icon href={member.linkedin} icon={faLinkedin} small />
          <Icon href={member.website} icon={faGlobe} small />
        </div>
      </div>
    </motion.div>
  );
}

/* ================= ICON ================= */
function Icon({ href, icon, small }) {
  const disabled = !href;
  return (
    <a
      href={href || "#"}
      onClick={(e) => disabled && e.preventDefault()}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center
                  ${small ? "w-8 h-8" : "w-10 h-10"}
                  rounded-full
                  ${disabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-600 hover:bg-horizon-orange hover:text-white"}
                  transition`}
    >
      <FontAwesomeIcon icon={icon} className={small ? "text-xs" : ""} />
    </a>
  );
}
