'use client';

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  Users2,
  ArrowRight,
  X,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2,
  Copy,
  Check,
  Grid3X3,
  Layers,
  Code2,
  Shield,
  Briefcase,
} from "lucide-react";

/* ================= COMPREHENSIVE TEAM DATA ================= */
const teamsData = [
  {
    id: "founders",
    name: "Founders",
    coverImage: "/team/founders.png",
    subtitle: "Vision, Governance & Core Leadership",
    badge: "Executive Board",
    accent: "from-horizon-orange to-horizon-amber",
    members: [
      {
        name: "Tristan Jorge Cuartero",
        role: "Founder & Quality Assurance",
        unit: "Founders",
        image: "/team/tristan7.png",
        description:
          "Leads organizational vision, establishes strategic technology roadmap, and enforces uncompromising standards for software quality and user experience.",
        email: "tristan.cuartero@horizonit.com",
        github: "https://github.com/krazytristan",
        linkedin: "https://linkedin.com",
        website: "https://personal-website-sage-tau.vercel.app/",
        skills: ["System Architecture", "QA Testing", "Strategy", "Web Platforms"],
        status: "Active Leadership",
      },
      {
        name: "Rodolfo C. Guce III",
        role: "Co-Founder",
        unit: "Founders",
        image: "/team/dither3.png",
        description:
          "Co-steers high-level organizational strategy, core system development architecture, and technical innovation programs.",
        email: "rodolfo.guce@horizonit.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://3dportfolio.gucediter03.workers.dev/",
        skills: ["System Design", "Co-Founder", "Backend Engines", "Cloud DevOps"],
        status: "Active Leadership",
      },
    ],
  },
  {
    id: "executives",
    name: "Executives",
    coverImage: "/team/Ej.png",
    subtitle: "Operations, Strategy & Corporate Growth",
    badge: "Operations & Management",
    accent: "from-horizon-amber to-horizon-yellow",
    members: [
      {
        name: "Elvin Joseph Comia",
        role: "Chief Operations Officer",
        unit: "Executives",
        image: "/team/Ej.png",
        description:
          "Oversees day-to-day operations, ensures cross-department efficiency, and aligns team deliverables with enterprise commitments.",
        email: "ejmc.ggbicas@gmail.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
        skills: ["Operations Management", "Strategic Execution", "Process Optimization", "Agile Leadership"],
        status: "Executive Lead",
      },
      {
        name: "Charles Lois Neil Viñalon",
        role: "Chief Marketing Officer",
        unit: "Executives",
        image: "/team/charles3.png",
        description:
          "Drives marketing strategy, brand equity, digital outreach, and strategic enterprise partnerships.",
        linkedin: "https://linkedin.com",
        skills: ["Brand Strategy", "Market Acquisition", "Public Relations", "Growth Marketing"],
        status: "Executive Lead",
      },
      {
        name: "Bejay Allen G. Macatangay",
        role: "Chief Financial Officer",
        unit: "Executives",
        image: "/team/bejay3.png",
        description:
          "Directs financial governance, budget strategy, fiscal planning, and corporate resource allocation.",
        linkedin: "https://linkedin.com",
        skills: ["Financial Strategy", "Resource Planning", "Risk Governance", "Budget Allocation"],
        status: "Executive Lead",
      },
      {
        name: "Florencio John Fonte III",
        role: "Project Leader",
        unit: "Executives",
        image: "/team/fonte3.png",
        description:
          "Coordinates technical sprints, milestones, developer velocity, and cross-team execution workflows.",
        email: "florencio.fonte@horizonit.com",
        linkedin: "https://linkedin.com",
        skills: ["Project Management", "Sprint Delivery", "Agile Workflows", "Team Coordination"],
        status: "Project Delivery",
      },
    ],
  },
  {
    id: "devteam1",
    name: "Development Team 1",
    coverImage: "/team/devteam1.png",
    subtitle: "Core Systems Architecture & Frontline UI",
    badge: "Core Engineering",
    accent: "from-horizon-yellow to-horizon-green",
    members: [
      {
        name: "Rodolfo Guce III",
        role: "Co-Founder & Lead Programmer",
        unit: "Development Team 1",
        image: "/team/dither3.png",
        description:
          "Architects robust backend services, high-throughput database systems, and secure application programming interfaces.",
        email: "rodolfo.guce@horizonit.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://ratbu123.github.io/Portfolio/",
        skills: ["Backend Architecture", "Node.js / Express", "Databases", "Performance Tuning"],
        status: "Lead Architect",
      },
      {
        name: "Ricky Dolor",
        role: "Frontend Developer",
        unit: "Development Team 1",
        image: "/team/ricky3.png",
        description:
          "Specializes in modern React component systems, state management, interactive animation, and responsive web clients.",
        email: "dolorricky7@gmail.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://feitan12.github.io/portfolioo/",
        skills: ["React 19", "Next.js", "Tailwind CSS", "UI Components"],
        status: "Senior Engineer",
      },
      {
        name: "John Mark Espiritu",
        role: "UI / UX Designer",
        unit: "Development Team 1",
        image: "/team/johnmark3.png",
        description:
          "Crafts intuitive design systems, wireframes, user testing journeys, and interactive product interfaces.",
        website: "https://portfolio.johnmark.dev",
        skills: ["Design Systems", "Figma Prototyping", "User Research", "Interaction Design"],
        status: "Design Lead",
      },
    ],
  },
  {
    id: "devteam2",
    name: "Development Team 2",
    coverImage: "/team/devteam2.png",
    subtitle: "Full-Stack Development & Systems Engineering",
    badge: "Full-Stack Solutions",
    accent: "from-horizon-green to-horizon-orange",
    members: [
      {
        name: "Joseph Rendon Cubio",
        role: "Lead Programmer (Full Stack)",
        unit: "Development Team 2",
        image: "/team/cubio3.png",
        description:
          "Spearheads full-stack application lifecycles, REST/GraphQL APIs, microservices, and client-server integrations.",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        skills: ["Full-Stack Engineering", "TypeScript", "RESTful APIs", "Cloud Integrations"],
        status: "Lead Full-Stack",
      },
      {
        name: "Marvin Paul Orozco",
        role: "Frontend & Backend Developer",
        unit: "Development Team 2",
        image: "/team/marvin3.png",
        description:
          "Builds scalable web applications, real-time data pipelines, and responsive client user interfaces.",
        github: "https://github.com",
        skills: ["Frontend & Backend", "Database Logic", "API Connectors", "Modern JavaScript"],
        status: "Full-Stack Engineer",
      },
      {
        name: "Kharlo Keizy Pitman",
        role: "Support Programmer",
        unit: "Development Team 2",
        image: "/team/pitman3.png",
        description:
          "Provides software diagnostics, production monitoring, bug triage, and client software maintenance.",
        email: "kharlo.pitman@horizonit.com",
        skills: ["Bug Diagnostics", "Quality Support", "Maintenance", "Code Testing"],
        status: "Technical Support",
      },
    ],
  },
];

// Flatten all members for global search & grid view
const allMembers = teamsData.flatMap((t) => t.members);

/* ================= MAIN COMPONENT ================= */
export default function Team() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [viewMode, setViewMode] = useState("members"); // 'members' or 'units'
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
        setSelectedUnit(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (selectedMember || selectedUnit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMember, selectedUnit]);

  // Filtered members calculation
  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "founders" && m.unit === "Founders") ||
        (activeTab === "executives" && m.unit === "Executives") ||
        (activeTab === "devteam1" && m.unit === "Development Team 1") ||
        (activeTab === "devteam2" && m.unit === "Development Team 2");

      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = m.name.toLowerCase().includes(q);
      const roleMatch = m.role.toLowerCase().includes(q);
      const unitMatch = m.unit.toLowerCase().includes(q);
      const skillMatch = m.skills?.some((s) => s.toLowerCase().includes(q));

      return nameMatch || roleMatch || unitMatch || skillMatch;
    });
  }, [activeTab, searchQuery]);

  const handleCopyEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <section
        id="team"
        className="relative py-28 lg:py-36 bg-zinc-950 text-white overflow-hidden"
      >
        {/* AMBIENT LIGHTING MESH */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-horizon-orange/10 via-horizon-amber/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-horizon-amber/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* ================= HEADER ================= */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-horizon-amber animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
                World-Class Technical Talent
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              The Architects & Engineers Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
                Horizon IT
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed font-light mb-8">
              A specialized team of system architects, full-stack engineers, and digital strategists committed to engineering resilient and future-proof digital solutions.
            </p>

            {/* KEY METRICS PILLS */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                <Users2 className="w-3.5 h-3.5 text-horizon-amber" />
                <span>12 Technical Specialists</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                <Layers className="w-3.5 h-3.5 text-horizon-orange" />
                <span>4 Strategic Divisions</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                <Code2 className="w-3.5 h-3.5 text-horizon-green" />
                <span>100% In-House Engineering</span>
              </div>
            </div>
          </div>

          {/* ================= CONTROLS ROW ================= */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* TABS FILTER */}
              <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full no-scrollbar">
                {[
                  { id: "all", label: "All Members", count: allMembers.length },
                  { id: "founders", label: "Founders", count: 2 },
                  { id: "executives", label: "Executives", count: 4 },
                  { id: "devteam1", label: "Dev Team 1", count: 3 },
                  { id: "devteam2", label: "Dev Team 2", count: 3 },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-md shadow-orange-500/20"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-black/25 text-black font-bold"
                            : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT CONTROLS: SEARCH & VIEW TOGGLE */}
              <div className="flex items-center gap-3">
                {/* SEARCH INPUT */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, role, skill..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-horizon-amber focus:ring-1 focus:ring-horizon-amber transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* VIEW MODE TOGGLE */}
                <div className="flex items-center bg-zinc-900/80 p-1 rounded-2xl border border-white/10 shrink-0">
                  <button
                    onClick={() => setViewMode("members")}
                    title="Grid of Members"
                    className={`p-2 rounded-xl transition ${
                      viewMode === "members"
                        ? "bg-white/10 text-horizon-amber"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("units")}
                    title="Department Divisions"
                    className={`p-2 rounded-xl transition ${
                      viewMode === "units"
                        ? "bg-white/10 text-horizon-amber"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* ================= VIEW: MEMBERS GRID ================= */}
          {viewMode === "members" && (
            <div>
              {filteredMembers.length > 0 ? (
                <motion.div
                  layout
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <AnimatePresence>
                    {filteredMembers.map((member) => (
                      <motion.div
                        key={member.name}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <MemberCard
                          member={member}
                          onSelect={() => setSelectedMember(member)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-20 p-8 rounded-3xl bg-zinc-900/40 border border-white/10">
                  <Users2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-1">No Team Members Found</h4>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-6">
                    No results match "{searchQuery}". Try searching for another name, skill, or role.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-r from-horizon-orange to-horizon-amber"
                  >
                    Clear Search Query
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= VIEW: DEPARTMENT UNITS ================= */}
          {viewMode === "units" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {teamsData.map((unit, i) => (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <UnitCard unit={unit} onSelect={() => setSelectedUnit(unit)} />
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ================= MODAL: INDIVIDUAL MEMBER DETAIL ================= */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="relative w-full max-w-2xl bg-zinc-950/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black text-white max-h-[90vh] overflow-y-auto"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* PROFILE HEADER */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/10">
                <div className="relative shrink-0">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-24 h-28 sm:w-28 sm:h-36 object-cover rounded-2xl border-2 border-white/15 shadow-xl"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-horizon-amber text-black shadow">
                    PRO
                  </span>
                </div>

                <div className="text-center sm:text-left min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-horizon-amber/20 text-horizon-amber border border-horizon-amber/30">
                      {selectedMember.unit}
                    </span>
                    <span className="text-xs text-horizon-green font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {selectedMember.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-horizon-amber text-sm font-semibold mt-0.5">
                    {selectedMember.role}
                  </p>

                  {/* SOCIAL LINKS */}
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-4">
                    {selectedMember.email && (
                      <button
                        onClick={() => handleCopyEmail(selectedMember.email)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-horizon-green" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
                      </button>
                    )}
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                        title="GitHub Profile"
                      >
                        <FontAwesomeIcon icon={faGithub} className="text-sm" />
                      </a>
                    )}
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                        title="LinkedIn Profile"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
                      </a>
                    )}
                    {selectedMember.website && (
                      <a
                        href={selectedMember.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                        title="Personal Website"
                      >
                        <FontAwesomeIcon icon={faGlobe} className="text-sm" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* BIO CONTENT */}
              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Professional Background & Contribution
                  </h4>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {selectedMember.description}
                  </p>
                </div>

                {/* SKILLS CHIPS */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                    Core Technical Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/[0.05] border border-white/10 text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
                <span>Horizon IT Solutions • Engineering Roster</span>
                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="text-horizon-amber font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Direct Email</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: UNIT ROSTER MODAL ================= */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUnit(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="w-full max-w-4xl bg-zinc-950/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black text-white max-h-[88vh] flex flex-col"
            >
              {/* MODAL HEADER */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10 shrink-0">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {selectedUnit.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-horizon-amber/20 text-horizon-amber border border-horizon-amber/30">
                      {selectedUnit.members.length} Members
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-1">{selectedUnit.subtitle}</p>
                </div>

                <button
                  onClick={() => setSelectedUnit(null)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* MEMBERS LIST */}
              <div className="grid md:grid-cols-2 gap-6 overflow-y-auto py-6 pr-1.5 custom-scrollbar">
                {selectedUnit.members.map((m) => (
                  <div
                    key={m.name}
                    onClick={() => {
                      setSelectedUnit(null);
                      setSelectedMember(m);
                    }}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-horizon-amber/40 hover:bg-zinc-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-16 h-20 object-cover rounded-xl border border-white/10 shrink-0 shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-base text-white group-hover:text-horizon-amber transition-colors truncate">
                          {m.name}
                        </h4>
                        <p className="text-xs text-horizon-amber font-medium mt-0.5">
                          {m.role}
                        </p>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-2">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL FOOTER */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 shrink-0">
                <span>Select any member card to view complete profile</span>
                <button
                  onClick={() => setSelectedUnit(null)}
                  className="text-horizon-amber hover:underline font-semibold"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= MEMBER CARD COMPONENT ================= */
function MemberCard({ member, onSelect }) {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <div
      onClick={onSelect}
      className="group relative h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-horizon-amber/50 hover:bg-zinc-900/90 shadow-xl shadow-black/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* AMBIENT HOVER HALO */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-horizon-orange/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* TOP ROW: AVATAR & SOCIAL ICONS */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative">
            {!imgError ? (
              <img
                src={member.image}
                alt={member.name}
                onError={() => setImgError(true)}
                className="w-16 h-20 sm:w-18 sm:h-22 object-cover rounded-2xl border border-white/15 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-16 h-20 rounded-2xl bg-gradient-to-br from-horizon-orange to-horizon-amber flex items-center justify-center font-black text-black text-base shadow-lg">
                {getInitials(member.name)}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-horizon-green border-2 border-zinc-950" title="Active" />
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                title="Send Email"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="text-xs" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-horizon-amber hover:text-black transition"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-xs" />
              </a>
            )}
          </div>
        </div>

        {/* MEMBER INFORMATION */}
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-zinc-400 border border-white/10 mb-2">
            {member.unit}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-horizon-amber transition-colors line-clamp-1">
            {member.name}
          </h4>
          <p className="text-xs text-horizon-amber font-semibold mt-0.5 line-clamp-1">
            {member.role}
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed mt-2.5 line-clamp-2">
            {member.description}
          </p>
        </div>
      </div>

      {/* BOTTOM SKILLS & ACTION */}
      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {member.skills?.slice(0, 2).map((s, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/5 truncate max-w-[100px]"
            >
              {s}
            </span>
          ))}
          {member.skills?.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-zinc-400">
              +{member.skills.length - 2}
            </span>
          )}
        </div>

        <span className="text-xs font-bold text-horizon-amber group-hover:translate-x-1 transition-transform flex items-center gap-1">
          <span>Bio</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

/* ================= UNIT CARD COMPONENT ================= */
function UnitCard({ unit, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="group relative h-[360px] rounded-3xl overflow-hidden bg-zinc-900/60 border border-white/10 hover:border-horizon-amber/50 shadow-xl shadow-black/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* COVER IMAGE */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
        <img
          src={unit.coverImage}
          alt={unit.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-75 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md border border-white/15 text-white">
          {unit.members.length} Members
        </span>
      </div>

      {/* DETAILS */}
      <div className="p-6 flex flex-col justify-between flex-1 bg-zinc-950/95">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-horizon-amber">
            {unit.badge}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-horizon-amber transition-colors mt-0.5">
            {unit.name}
          </h3>
          <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
            {unit.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-horizon-amber group-hover:text-horizon-yellow transition-colors">
          <span>View Roster</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
