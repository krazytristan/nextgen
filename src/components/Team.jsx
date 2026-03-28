import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

/* ================= DATA ================= */

const teams = [
  {
    name: "Founders",
    image: "/team/founders.png",
    members: [
      {
        name: "Tristan Jorge Cuartero",
        role: "Founder & Quality Assurance",
        image: "/team/tristan7.png",
        description: "Leads the organization vision and ensures quality.",
        email: "tristan.cuartero@horizonit.com",
        github: "https://github.com/krazytristan",
        linkedin: "https://linkedin.com",
        website: "https://personal-website-sage-tau.vercel.app/",
      },
      {
        name: "Rodolfo C. Guce II",
        role: "Co-Founder",
        image: "/team/dither3.png",
        description: "Supports strategy and system development.",
        email: "rodolfo.guce@horizonit.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    ],
  },

  {
    name: "Development Team 1",
    image: "/team/devteam1.png",
    members: [
      {
        name: "Rodolfo Guce III",
        role: "Co-Founder & Lead Programmer",
        image: "/team/dither3.png",
        description: "Leads backend architecture.",
        email: "rodolfo.guce@horizonit.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://ratbu123.github.io/Portfolio/",
      },
      {
        name: "Florencio John Fonte III",
        role: "Project Leader",
        image: "/team/fonte3.png",
        description: "Manages workflow.",
        email: "florencio.fonte@horizonit.com",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Ricky Dolor",
        role: "Frontend Developer",
        image: "/team/ricky3.png",
        description: "Builds UI systems.",
        email: "dolorricky7@gmail.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://feitan12.github.io/portfolioo/",
      },
      {
        name: "John Mark Espiritu",
        role: "UI / UX Designer",
        image: "/team/johnmark3.png",
        description: "Designs UX/UI.",
        website: "https://portfolio.johnmark.dev",
      },
      {
        name: "Charles Lois Neil Viñalon",
        role: "Chief Marketing Officer",
        image: "/team/charles3.png",
        description: "Handles marketing.",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Bejay Allen G. Macatangay",
        role: "Chief Financial Officer",
        image: "/team/bejay3.png",
        description: "Handles finances.",
        linkedin: "https://linkedin.com",
      },
    ],
  },

  {
    name: "Development Team 2",
    image: "/team/devteam2.png",
    members: [
      {
        name: "Joseph Rendon Cubio",
        role: "Lead Programmer (Full Stack)",
        image: "/team/cubio3.png",
        description: "Handles full-stack.",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Marvin Paul Orozco",
        role: "Frontend & Backend Developer",
        image: "/team/marvin3.png",
        description: "Builds systems.",
        github: "https://github.com",
      },
      {
        name: "Kharlo Keizy Pitman",
        role: "Support Programmer",
        image: "/team/pitman3.png",
        description: "Provides support.",
        email: "kharlo.pitman@horizonit.com",
      },
    ],
  },
];

/* ================= MAIN ================= */

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelectedTeam(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedTeam ? "hidden" : "auto";
  }, [selectedTeam]);

  return (
    <>
      {/* ================= SECTION WITH BG IMAGE ================= */}
      <section
        className="relative py-28 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/team/team.png')" }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-6">

          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Our <span className="text-orange-400">Teams</span>
            </h2>

            <p className="mt-4 text-gray-200 text-lg leading-relaxed">
              Our team is composed of passionate innovators, skilled developers, and creative thinkers 
              dedicated to building high-quality digital solutions. We collaborate to create 
              efficient, user-centered systems that drive innovation and real-world impact.
            </p>
          </div>

          {/* TEAM GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <TeamCard key={team.name} team={team} onClick={setSelectedTeam} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedTeam(null)}
                className="mb-6 text-gray-400 hover:text-orange-500"
              >
                ✕ Close
              </button>

              <h3 className="text-2xl font-bold mb-6">
                {selectedTeam.name}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 max-h-[450px] overflow-y-auto pr-2">
                {selectedTeam.members.map((m) => (
                  <div
                    key={m.name}
                    className="text-center p-5 bg-gray-50 rounded-2xl hover:shadow-lg transition"
                  >
                    <div className="flex justify-center mb-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-24 h-32 object-cover rounded-xl shadow border"
                      />
                    </div>

                    <h4 className="font-semibold">{m.name}</h4>
                    <p className="text-orange-500 text-sm">{m.role}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      {m.description}
                    </p>

                    <div className="flex justify-center gap-3 mt-4">
                      <Icon href={m.email && `mailto:${m.email}`} icon={faEnvelope} />
                      <Icon href={m.github} icon={faGithub} />
                      <Icon href={m.linkedin} icon={faLinkedin} />
                      <Icon href={m.website} icon={faGlobe} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= TEAM CARD ================= */

function TeamCard({ team, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(team)}
      className="cursor-pointer rounded-3xl overflow-hidden shadow-xl group"
    >
      <div className="relative h-60">
        <img
          src={team.image}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-xl font-bold">{team.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= ICON ================= */

function Icon({ href, icon }) {
  const disabled = !href;

  return (
    <a
      href={href || "#"}
      onClick={(e) => disabled && e.preventDefault()}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-9 h-9 flex items-center justify-center rounded-full
        ${disabled
          ? "bg-gray-100 text-gray-300"
          : "bg-gray-100 hover:bg-orange-500 hover:text-white"}
        transition`}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}