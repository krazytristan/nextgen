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
        name: "Rodolfo C. Guce III",
        role: "Co-Founder",
        image: "/team/dither3.png",
        description: "Supports strategy and system development.",
        email: "rodolfo.guce@horizonit.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://3dportfolio.gucediter03.workers.dev/",
      },
    ],
  },

  {
  name: "Executives",
  image: "/team/Ej.png",
  members: [
    {
      name: "Elvin Joseph Comia",
      role: "Chief Operations Officer",
      image: "/team/Ej.png",
      description: "Oversees daily operations, ensures organizational efficiency, and manages strategic execution across teams.",
      email: "ejmc.ggbicas@gmail.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
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
      {/* ================= ULTRA PREMIUM SECTION ================= */}
      <section
        className="relative py-32 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/team/team.png')" }}
      >
        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-orange-900/40"></div>

        <div className="relative z-10 container mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-white">
              Our <span className="text-orange-400">Teams</span>
            </h2>

            <p className="mt-6 text-gray-200 text-lg leading-relaxed">
              Our team is composed of passionate innovators, skilled developers, 
              and creative thinkers dedicated to building high-quality digital 
              solutions that create real-world impact.
            </p>
          </motion.div>

          {/* TEAM GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teams.map((team, i) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <TeamCard team={team} onClick={setSelectedTeam} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-5xl w-full p-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedTeam(null)}
                className="mb-6 text-gray-400 hover:text-orange-500"
              >
                ✕ Close
              </button>

              <h3 className="text-3xl font-bold mb-8">
                {selectedTeam.name}
              </h3>

              <div className="grid md:grid-cols-2 gap-8 max-h-[500px] overflow-y-auto pr-2">
                {selectedTeam.members.map((m) => (
                  <div
                    key={m.name}
                    className="text-center p-6 bg-white/70 rounded-2xl shadow hover:shadow-xl"
                  >
                    <div className="flex justify-center mb-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-28 h-36 object-cover rounded-xl shadow-lg"
                      />
                    </div>

                    <h4 className="font-semibold text-lg">{m.name}</h4>
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
      whileHover={{ scale: 1.05, y: -6 }}
      onClick={() => onClick(team)}
      className="cursor-pointer rounded-3xl overflow-hidden group relative shadow-xl"
    >
      <div className="relative h-64">

        <img
          src={team.image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-xl font-bold">{team.name}</h3>
          <p className="text-sm opacity-80">Explore Team →</p>
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
      className={`w-10 h-10 flex items-center justify-center rounded-full
        ${disabled
          ? "bg-gray-100 text-gray-300"
          : "bg-gray-100 hover:bg-orange-500 hover:text-white"}
        transition`}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}