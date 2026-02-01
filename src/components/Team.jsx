import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
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

/* ================= ROLE DESCRIPTIONS ================= */
function getRoleDescription(role = "") {
  const r = role.toLowerCase();

  if (r.includes("founder"))
    return "Provides strategic direction, ensures quality standards, and oversees the long-term growth of the organization.";

  if (r.includes("lead programmer") || r.includes("full stack"))
    return "Leads system architecture, technical decisions, and ensures overall development quality.";

  if (r.includes("project"))
    return "Manages project planning, coordination, and ensures timely and efficient delivery.";

  if (r.includes("ui") || r.includes("ux"))
    return "Designs intuitive user experiences and visually engaging interfaces.";

  if (r.includes("frontend"))
    return "Builds responsive user interfaces and ensures smooth client-side interactions.";

  if (r.includes("backend"))
    return "Develops server-side logic, APIs, and database integrations.";

  if (r.includes("support"))
    return "Assists in development tasks, system maintenance, and implementation support.";

  if (r.includes("marketing"))
    return "Handles brand strategy, outreach initiatives, and marketing communications.";

  return "Contributes specialized skills and collaborates with the team to deliver quality solutions.";
}

/* ================= DATA ================= */
const founder = {
  name: "Tristan Jorge Cuartero",
  role: "Founder & Quality Assurance",
  bio: "Founder of NEXGEN 9 IT Solutions. Oversees quality assurance, standards, and long-term direction.",
  image: "/team/tristan.png",
  email: "tristan.cuartero@horizonit.com",
  github: "https://github.com/krazytristan",
  linkedin: "https://www.linkedin.com/in/tristan-jorge-cuartero/",
  website: "https://personal-website-sage-tau.vercel.app/",
};

const teams = [
  {
    title: "Development Team 1",
    direction: "left",
    members: [
      { name: "Rodolfo Guce III", role: "Co-Founder & Lead Programmer", image: "/team/rodolfo.jpg", email: "rodolfo.guce@horizonit.com", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Florencio John Fonte III", role: "Project Leader", image: "/team/fonte.jpg", email: "florencio.fonte@horizonit.com", linkedin: "https://linkedin.com" },
      { name: "Ricky Dolor", role: "Frontend Developer", image: "/team/ricky.jpg", github: "https://github.com" },
      { name: "John Mark Espiritu", role: "UI / UX Designer", image: "/team/johnmark.jpg", website: "https://portfolio.johnmark.dev" },
      { name: "Charles Lois Neil Viñalon", role: "Chief Marketing Officer", image: "/team/charles.jpg", linkedin: "https://linkedin.com" },
    ],
  },
  {
    title: "Development Team 2",
    direction: "right",
    members: [
      { name: "Joseph Rendon Cubio", role: "Lead Programmer (Full Stack)", image: "/team/cubio.png", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Marvin Paul Orozco", role: "Frontend & Backend Developer", image: "/team/marvin.png", github: "https://github.com" },
      { name: "Kharlo Keizy Pitman", role: "Support Programmer", image: "/team/kharlo.png", email: "kharlo.pitman@horizonit.com" },
    ],
  },
];

/* ================= MAIN COMPONENT ================= */
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
        className="relative py-40 bg-gradient-to-b from-white via-horizon-yellow/10 to-white"
      >
        <div className="container">

          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="inline-flex px-6 py-2 mb-6 rounded-full bg-horizon-orange/10 text-horizon-orange text-sm font-semibold">
              Our Organization
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
              Leadership & <span className="text-horizon-orange">Teams</span>
            </h2>
            <p className="text-lg text-gray-600">
              A collaborative structure built on quality, trust, and innovation.
            </p>
          </div>

          {/* FOUNDER */}
          <div className="flex justify-center mb-36">
            <FounderCard member={founder} onClick={setSelected} />
          </div>

          {/* TEAMS */}
          <div className="space-y-36">
            {teams.map((team) => (
              <div key={team.title}>
                <h3 className="text-2xl font-bold text-center mb-10">
                  {team.title}
                </h3>

                <TeamCarousel
                  members={team.members}
                  direction={team.direction}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-horizon-orange"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>

                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-36 h-36 mx-auto rounded-3xl object-cover shadow-lg mb-6"
                />

                <h3 className="font-bold text-2xl text-center">
                  {selected.name}
                </h3>
                <p className="text-horizon-orange font-medium text-center">
                  {selected.role}
                </p>

                <p className="text-gray-600 text-center mt-4">
                  {selected.bio || getRoleDescription(selected.role)}
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  {selected.email && <SocialIcon href={`mailto:${selected.email}`} icon={faEnvelope} />}
                  {selected.github && <SocialIcon href={selected.github} icon={faGithub} />}
                  {selected.linkedin && <SocialIcon href={selected.linkedin} icon={faLinkedin} />}
                  {selected.website && <SocialIcon href={selected.website} icon={faGlobe} />}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= CAROUSEL ================= */
function TeamCarousel({ members, direction, onSelect }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });

  if (reduceMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {members.map((m) => (
          <TeamCard key={m.name} member={m} onClick={onSelect} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative overflow-hidden min-h-[460px]
                 flex items-center"
    >
      <motion.div
        className="flex gap-14 w-max"
        animate={
          inView
            ? { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
            : {}
        }
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...members, ...members].map((member, i) => (
          <div key={i} className="w-[280px] flex-shrink-0">
            <TeamCard member={member} onClick={onSelect} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ================= CARDS ================= */
function FounderCard({ member, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => onClick(member)}
      className="bg-white rounded-[2.5rem] shadow-2xl px-12 pt-20 pb-12 text-center ring-4 ring-horizon-orange/20"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-40 h-40 mx-auto rounded-[2rem] object-cover shadow-xl mb-6"
      />
      <h4 className="text-2xl font-bold">{member.name}</h4>
      <p className="text-horizon-orange font-medium mb-6">{member.role}</p>
      <p className="text-gray-600 max-w-md mx-auto">{member.bio}</p>
    </motion.div>
  );
}

function TeamCard({ member, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => onClick(member)}
      className="bg-white rounded-3xl shadow-xl px-8 py-10
                 h-[360px]
                 flex flex-col items-center justify-between text-center"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-28 h-28 rounded-2xl object-cover shadow-lg"
      />
      <div>
        <h4 className="font-bold text-lg">{member.name}</h4>
        <p className="text-horizon-orange text-sm">{member.role}</p>
      </div>
      <div className="flex gap-3">
        {member.email && <MiniIcon href={`mailto:${member.email}`} icon={faEnvelope} />}
        {member.github && <MiniIcon href={member.github} icon={faGithub} />}
        {member.linkedin && <MiniIcon href={member.linkedin} icon={faLinkedin} />}
        {member.website && <MiniIcon href={member.website} icon={faGlobe} />}
      </div>
    </motion.div>
  );
}

/* ================= ICONS ================= */
function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-horizon-orange hover:text-white transition"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

function MiniIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-horizon-orange hover:text-white transition"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
