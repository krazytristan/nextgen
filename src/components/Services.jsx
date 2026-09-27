'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useMemo } from "react";
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
  Sliders,
  Cpu,
  Database,
  Server,
  Zap,
  Lock,
  Search,
  X,
  ChevronRight,
  Gauge,
  Terminal,
  Check,
  Send,
} from "lucide-react";

/* ================= SERVICES MASTER DATA ================= */
const services = [
  {
    id: "software",
    category: "Engineering",
    title: "Custom Enterprise Software",
    shortDesc: "Tailored software systems engineered to automate complex workflows and scale seamlessly.",
    desc: "Tailored software systems engineered to eliminate operational friction, automate complex workflows, and scale with your enterprise. Built with clean modular architecture and robust data integrity.",
    icon: Code2,
    accent: "from-horizon-orange to-horizon-amber",
    glow: "rgba(236,143,94,0.3)",
    badge: "Mission Critical",
    metrics: { label: "Throughput", val: "3x Faster" },
    tags: ["Custom Business Logic", "ERP / CRM Systems", "Automated Workflows"],
    techStack: ["Node.js", "PostgreSQL", "Docker", "Redis", "TypeScript"],
    deliverables: [
      "Custom business logic & process automation engine",
      "Centralized ERP / CRM database architectures",
      "Multi-tenant role-based permissions & audit trails",
      "Automated PDF/Excel report generators & scheduled tasks",
      "Internal tooling & executive analytics dashboards",
    ],
    architecture:
      "Modular micro-service architecture with isolated transactional boundaries, event sourcing, and high-concurrency database connection pooling.",
    sla: "99.95% Availability SLA with 24/7 system health telemetry.",
  },
  {
    id: "web-apps",
    category: "Engineering",
    title: "High-Performance Web & SaaS",
    shortDesc: "Sub-second responsive web platforms built with React, Next.js, and modern APIs.",
    desc: "Lightning-fast, accessible web platforms built with React, Next.js, and modern APIs. Engineered for maximum conversion rates, SEO supremacy, and real-time state synchronization.",
    icon: Globe2,
    accent: "from-horizon-amber to-horizon-yellow",
    glow: "rgba(243,182,100,0.3)",
    badge: "Sub-100ms TTFB",
    metrics: { label: "Lighthouse", val: "98+ Avg" },
    tags: ["SaaS Architecture", "Real-Time Sync", "Progressive Web Apps"],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS", "GraphQL", "Supabase"],
    deliverables: [
      "Multi-tenant SaaS client architecture & subscription billing",
      "Sub-second page transitions & edge server-side rendering (SSR)",
      "Real-time collaborative workspaces & WebSocket integration",
      "Responsive UI/UX design optimized for 100% mobile accessibility",
      "Global CDN caching & automated image optimization",
    ],
    architecture:
      "Modern edge-rendered Next.js frontend communicating with headless APIs via GraphQL and WebSocket channels for instant state synchronization.",
    sla: "Zero-downtime rolling deploys with automated rollback guards.",
  },
  {
    id: "mobile",
    category: "Engineering",
    title: "Mobile App Development",
    shortDesc: "Fluid cross-platform iOS and Android applications with native 60fps performance.",
    desc: "Fluid, cross-platform iOS and Android applications delivering native performance, responsive gestures, and offline-first capabilities. Tested across real mobile device matrices.",
    icon: Smartphone,
    accent: "from-horizon-yellow to-horizon-green",
    glow: "rgba(241,235,144,0.3)",
    badge: "Cross-Platform",
    metrics: { label: "Frame Rate", val: "60 FPS Native" },
    tags: ["iOS & Android", "Offline First", "Push Notifications"],
    techStack: ["React Native", "Expo", "TypeScript", "SQLite", "Firebase"],
    deliverables: [
      "Unified single-codebase deployment to Apple App Store & Google Play",
      "Offline-first local SQLite sync with automatic cloud reconciliation",
      "Biometric authentication (FaceID, Fingerprint) & secure storage",
      "Segmented push notification pipelines & deep-linking handlers",
      "Native device sensor integrations (Camera, GPS, Bluetooth)",
    ],
    architecture:
      "React Native bridge architecture with native reanimated gesture handlers and local encrypted persistence caches.",
    sla: "Multi-device QA matrix certification prior to store publication.",
  },
  {
    id: "cloud",
    category: "Cloud & Security",
    title: "Cloud Infrastructure & DevOps",
    shortDesc: "Resilient cloud architectures deployed on AWS and Docker clusters with CI/CD.",
    desc: "Resilient cloud architectures deployed on AWS and modern container clusters with automated CI/CD and zero-downtime rollouts. Built for automatic horizontal scaling during traffic spikes.",
    icon: Cloud,
    accent: "from-horizon-green to-horizon-orange",
    glow: "rgba(159,187,115,0.3)",
    badge: "99.99% Uptime",
    metrics: { label: "Deployment", val: "Zero-Downtime" },
    tags: ["AWS / Docker", "CI/CD Pipelines", "Auto-Scaling"],
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    deliverables: [
      "Containerized microservices deployments with Docker & ECS/EKS",
      "Automated CI/CD pipelines with automated testing and rollbacks",
      "Dynamic auto-scaling infrastructure responsive to real-time traffic spikes",
      "Centralized log aggregations (Grafana, CloudWatch, OpenTelemetry)",
      "Disaster recovery planning, multi-region failovers, and automated backups",
    ],
    architecture:
      "Infrastructure-as-Code (Terraform) provisioning isolated VPCs, private subnets, managed Kubernetes nodes, and automated load balancing.",
    sla: "Enterprise-tier 99.99% uptime guarantee with multi-zone failover.",
  },
  {
    id: "integration",
    category: "Engineering",
    title: "Systems & API Integration",
    shortDesc: "Connect disparate databases, legacy systems, payment gateways, and APIs.",
    desc: "Seamless connectivity connecting disparate databases, legacy systems, payment gateways, and third-party APIs into one unified engine with guaranteed data delivery and zero message loss.",
    icon: Layers,
    accent: "from-horizon-orange to-horizon-green",
    glow: "rgba(236,143,94,0.3)",
    badge: "Zero Data Loss",
    metrics: { label: "Sync Latency", val: "<50ms Sync" },
    tags: ["REST / GraphQL", "Payment Systems", "Webhook Automation"],
    techStack: ["REST APIs", "GraphQL", "Stripe", "Kafka", "Webhooks"],
    deliverables: [
      "Enterprise payment gateway orchestrations (Stripe, PayPal, Local Gateways)",
      "Bi-directional webhook ingestion engines with automatic retry queues",
      "Legacy database modernizations & ETL synchronization pipelines",
      "Standardized GraphQL federation layers unifying microservice schemas",
      "Third-party SaaS connector builds (HubSpot, Salesforce, Slack, ERPs)",
    ],
    architecture:
      "Event-driven asynchronous messaging broker with dead-letter queue recovery and idempotent processing workers.",
    sla: "Sub-50ms message propagation with guaranteed delivery order.",
  },
  {
    id: "security",
    category: "Cloud & Security",
    title: "Cybersecurity & Data Governance",
    shortDesc: "End-to-end security audits, identity management, zero-trust controls, and audits.",
    desc: "End-to-end security audits, identity management, zero-trust controls, and compliance governance to safeguard your critical data against emerging threats.",
    icon: ShieldCheck,
    accent: "from-horizon-amber to-horizon-orange",
    glow: "rgba(243,182,100,0.3)",
    badge: "Zero-Trust",
    metrics: { label: "Encryption", val: "AES-256 / TLS" },
    tags: ["Data Encryption", "Zero-Trust", "Vulnerability Auditing"],
    techStack: ["OAuth2 / OIDC", "Vault", "WAF", "OWASP", "Sentry"],
    deliverables: [
      "Comprehensive penetration testing & vulnerability assessment reports",
      "Enterprise Single Sign-On (SSO) with OAuth2 / SAML / Multi-Factor Auth",
      "End-to-end data encryption at rest (AES-256) and in transit (TLS 1.3)",
      "Role-Based Access Control (RBAC) & fine-grained permission matrices",
      "Automated dependency vulnerability audits & runtime security policy checks",
    ],
    architecture:
      "Defense-in-depth zero-trust security perimeter with secrets vault injection and continuous threat detection monitoring.",
    sla: "Zero critical vulnerability threshold with continuous patch monitoring.",
  },
];

const categories = ["All", "Engineering", "Cloud & Security"];

/* ================= SCOPE BUILDER OPTIONS ================= */
const solutionTypes = [
  { id: "web", name: "Web & SaaS Platform", baseWeeks: 4, stack: "Next.js 15, React 19, Supabase, Tailwind" },
  { id: "software", name: "Custom Enterprise Software", baseWeeks: 6, stack: "Node.js, PostgreSQL, Docker, Redis" },
  { id: "mobile", name: "Mobile App (iOS/Android)", baseWeeks: 5, stack: "React Native, Expo, SQLite, Cloud Sync" },
  { id: "cloud", name: "Cloud Infrastructure & DevOps", baseWeeks: 3, stack: "AWS, Kubernetes, Terraform, Docker" },
  { id: "security", name: "Cybersecurity & Audit", baseWeeks: 2, stack: "OAuth2, Zero-Trust, WAF, Vault" },
];

const addonModules = [
  { id: "realtime", name: "Real-Time Sync / WebSockets", weeks: 1, desc: "Instant bi-directional state updates" },
  { id: "payments", name: "Payment Gateway & Subscriptions", weeks: 1.5, desc: "Stripe / PayPal recurring billing" },
  { id: "rbac", name: "Multi-Tenant RBAC & SSO", weeks: 1, desc: "Role-based access & enterprise auth" },
  { id: "ai", name: "AI Copilot & Workflow Automation", weeks: 2, desc: "LLM integration & smart bots" },
  { id: "devops", name: "Auto-Scaling & CI/CD Pipelines", weeks: 1.5, desc: "Zero-downtime AWS deployments" },
  { id: "audit", name: "Compliance & Security Hardening", weeks: 1, desc: "Pen-testing & AES-256 data protection" },
];

const scaleTiers = [
  { id: "mvp", name: "MVP / Startup", multiplier: 1, squad: "1 Lead Architect + 2 Full-Stack Engineers" },
  { id: "growth", name: "Scale-Up / Growth", multiplier: 1.3, squad: "1 Architect + 3 Engineers + 1 DevOps" },
  { id: "enterprise", name: "Enterprise Scale", multiplier: 1.6, squad: "Dedicated Pod (Lead + 4 Engineers + DevOps + QA)" },
];

/* ================= ARCHITECTURE PIPELINE STAGES ================= */
const architectureStages = [
  {
    tier: "01",
    name: "Client Edge Layer",
    tech: "Next.js 15 SSR • React Native • Edge CDN • PWA",
    desc: "Ultra-fast global edge distribution ensuring instant time-to-first-byte and 60fps native client interactions.",
    status: "Active Edge",
    latency: "< 35ms",
    icon: Globe2,
    specs: ["Global Cloudflare / AWS CloudFront routing", "Asset compression & Brotli encoding", "Edge-cached static fallbacks", "Hydration resilience"],
  },
  {
    tier: "02",
    name: "Zero-Trust Security Gateway",
    tech: "WAF • OAuth2 / OIDC • Rate Limiting • TLS 1.3",
    desc: "Hardened perimeter inspecting every ingress packet, preventing DDoS, SQLi, and unauthorized access.",
    status: "Shielded",
    latency: "< 8ms",
    icon: Lock,
    specs: ["JSON Web Token (JWT) verification", "Automated rate limiting & anomaly bans", "Mutual TLS between backend clusters", "OWASP Top 10 compliance"],
  },
  {
    tier: "03",
    name: "Application & Microservices",
    tech: "Node.js • GraphQL • Kafka • Worker Queues",
    desc: "Modular business logic services handling asynchronous tasks, background data processing, and payments.",
    status: "Cluster Online",
    latency: "< 45ms",
    icon: Server,
    specs: ["Idempotent payment transaction handlers", "Distributed background job runners", "Event-driven asynchronous messaging", "Multi-tenant tenant isolation"],
  },
  {
    tier: "04",
    name: "Resilient Cloud & Data Layer",
    tech: "AWS ECS • PostgreSQL Cluster • Redis • S3",
    desc: "High-durability storage clusters with automatic multi-zone replication, instant caching, and automated backups.",
    status: "Replicated",
    latency: "< 5ms",
    icon: Database,
    specs: ["Read-replica PostgreSQL auto-failover", "In-memory Redis sub-millisecond cache", "Encrypted-at-rest S3 bucket vaults", "Continuous automated snapshotting"],
  },
];

/* ================= 3D TILT SERVICE CARD ================= */
function ServiceCard({ service, onInspect, onInquire }) {
  const reduceMotion = useReducedMotion();
  const Icon = service.icon;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smoothX = useSpring(mx, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 320], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 320], [-6, 6]);

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
      className="relative group rounded-3xl p-[1px] transition-all duration-300 flex flex-col h-full"
    >
      {/* AMBIENT BORDER GRADIENT */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
      />

      {/* CARD BODY */}
      <motion.div
        style={{ background: cardGlow }}
        className="relative flex-1 flex flex-col justify-between bg-zinc-950/85 backdrop-blur-2xl rounded-3xl p-7 sm:p-8 border border-white/10 group-hover:border-white/25 shadow-xl shadow-black/60 transition-colors"
      >
        <div>
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-black shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-horizon-amber">
                {service.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-zinc-400">
                {service.category}
              </span>
            </div>
          </div>

          {/* TITLE & DESCRIPTION */}
          <h4 className="text-xl font-bold text-white mb-2.5 group-hover:text-horizon-amber transition-colors">
            {service.title}
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">
            {service.shortDesc}
          </p>

          {/* KEY METRIC HIGHLIGHT */}
          <div className="mb-5 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-horizon-amber" />
              {service.metrics.label}
            </span>
            <span className="text-xs font-bold text-white bg-white/5 px-2 py-0.5 rounded-md">
              {service.metrics.val}
            </span>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] rounded-full bg-white/[0.04] text-zinc-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ACTIONS ROW */}
        <div className="pt-4 border-t border-white/5 flex items-center gap-3">
          <button
            onClick={() => onInspect(service)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 hover:border-white/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Inspect Blueprint</span>
            <ChevronRight className="w-3.5 h-3.5 text-horizon-amber" />
          </button>

          <button
            onClick={() => onInquire(service)}
            title="Inquire about this service"
            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-horizon-orange to-horizon-amber text-black text-xs font-bold hover:brightness-110 flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 transition-all"
          >
            <span>Inquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= SERVICE INSPECTOR MODAL ================= */
function ServiceModal({ service, onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState("deliverables");
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-black shrink-0 shadow-lg`}
          >
            <Icon className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-horizon-amber">
                {service.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400">{service.badge}</span>
            </div>
            <h3 className="text-2xl font-black text-white">{service.title}</h3>
          </div>
        </div>

        {/* MODAL TABS */}
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => setActiveTab("deliverables")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "deliverables"
                ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Deliverables & Scope
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "architecture"
                ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Architecture & Tech
          </button>
          <button
            onClick={() => setActiveTab("sla")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "sla"
                ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            SLA & Telemetry
          </button>
        </div>

        {/* TAB BODY (SCROLLABLE) */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 mb-6">
          {activeTab === "deliverables" && (
            <div className="space-y-3">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {service.desc}
              </p>
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pt-2">
                Guaranteed Core Deliverables:
              </h5>
              <div className="space-y-2">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3 text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-horizon-amber shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-horizon-amber">
                  <Cpu className="w-4 h-4" />
                  <span>Architecture Overview</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {service.architecture}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Production Tech Stack:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex items-center gap-2"
                    >
                      <Terminal className="w-3.5 h-3.5 text-horizon-amber" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sla" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-horizon-green/10 border border-horizon-green/30 text-white">
                <div className="flex items-center gap-2 font-bold text-horizon-green text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enterprise SLA Assurance</span>
                </div>
                <p className="text-xs text-zinc-300">{service.sla}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[11px] text-zinc-400 block mb-1">Target Response Time</span>
                  <span className="text-base font-bold text-white">&lt; 15 Minutes</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[11px] text-zinc-400 block mb-1">Code Coverage Standard</span>
                  <span className="text-base font-bold text-white">85%+ Unit & E2E</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTION */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onSelect(service);
              onClose();
            }}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow hover:scale-[1.02] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Inquire for {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= INTERACTIVE SCOPE BUILDER ================= */
function SolutionBuilder({ onTransferScope }) {
  const [selectedSolution, setSelectedSolution] = useState(solutionTypes[0].id);
  const [selectedModules, setSelectedModules] = useState(["realtime", "devops"]);
  const [selectedScale, setSelectedScale] = useState(scaleTiers[1].id);

  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const solution = solutionTypes.find((s) => s.id === selectedSolution);
  const scale = scaleTiers.find((s) => s.id === selectedScale);

  /* CALCULATE ESTIMATED TIMELINE */
  const totalWeeks = useMemo(() => {
    const base = solution?.baseWeeks || 4;
    const addWeeks = selectedModules.reduce((acc, modId) => {
      const mod = addonModules.find((m) => m.id === modId);
      return acc + (mod?.weeks || 0);
    }, 0);
    const multiplier = scale?.multiplier || 1;
    return Math.round((base + addWeeks) * multiplier);
  }, [solution, selectedModules, scale]);

  const handleApplyScope = () => {
    const activeModuleNames = selectedModules
      .map((id) => addonModules.find((m) => m.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const subject = `[Project Scope] ${solution.name} (${scale.name})`;
    const message = `Configured Scope from Interactive Builder:\n- Solution Foundation: ${solution.name}\n- Target Scale: ${scale.name}\n- Add-on Modules: ${activeModuleNames || "Standard"}\n- Estimated Delivery Window: ~${totalWeeks} Weeks\n- Recommended Stack: ${solution.stack}`;

    onTransferScope(subject, message);
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-horizon-amber/10 border border-horizon-amber/20 text-horizon-amber text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Solution Architect</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Configure Your Project Scope & Estimate
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Toggle your technical modules to generate a recommended architectural stack, delivery timeline, and engineering squad.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-6 shrink-0">
          <div>
            <span className="text-[11px] text-zinc-400 block uppercase font-semibold">Estimated Delivery</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange to-horizon-amber">
              ~{totalWeeks} Weeks
            </span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div>
            <span className="text-[11px] text-zinc-400 block uppercase font-semibold">Active Modules</span>
            <span className="text-2xl font-black text-white">
              {selectedModules.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT CONFIGURATION CONTROLS */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: FOUNDATION */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-3">
              1. Choose Solution Foundation
            </label>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {solutionTypes.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    selectedSolution === sol.id
                      ? "bg-horizon-orange/15 border-horizon-amber/60 text-white shadow-lg shadow-orange-500/10"
                      : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/15 hover:text-white"
                  }`}
                >
                  <p className="text-xs font-bold">{sol.name}</p>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">Base ~{sol.baseWeeks}w</p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: MODULES */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-3">
              2. Select Architecture Add-ons
            </label>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {addonModules.map((mod) => {
                const isChecked = selectedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3.5 rounded-2xl text-left border flex items-start justify-between gap-3 transition-all ${
                      isChecked
                        ? "bg-white/[0.08] border-horizon-amber text-white shadow-md shadow-orange-500/10"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{mod.name}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{mod.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? "bg-horizon-amber border-horizon-amber text-black"
                          : "border-white/20"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: SCALE TIER */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-3">
              3. Target Audience & Scale Tier
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {scaleTiers.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScale(sc.id)}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    selectedScale === sc.id
                      ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black font-bold border-transparent"
                      : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/15 hover:text-white text-xs font-semibold"
                  }`}
                >
                  <span>{sc.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY & EXPORT */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-horizon-amber flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Blueprint</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block mb-0.5">Selected Foundation</span>
                <span className="font-bold text-white text-sm">{solution.name}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block mb-0.5">Recommended Tech Stack</span>
                <span className="font-semibold text-horizon-amber">{solution.stack}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block mb-0.5">Engineering Squad Allocation</span>
                <span className="font-medium text-zinc-300">{scale.squad}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleApplyScope}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow hover:scale-[1.02] shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transfer Scope to Project Inquiry</span>
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-2.5">
                Auto-fills your specifications directly into the inquiry form below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ARCHITECTURE PIPELINE VISUALIZER ================= */
function ArchitectureVisualizer({ onInquireTier }) {
  const [selectedTier, setSelectedTier] = useState(0);
  const activeStage = architectureStages[selectedTier];
  const Icon = activeStage.icon;

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-horizon-amber/10 border border-horizon-amber/20 text-horizon-amber text-xs font-bold uppercase tracking-wider mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Full-Stack Architecture</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Enterprise Cloud & Application Pipeline
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Explore how Horizon IT connects every tier from client edge devices to resilient cloud storage.
        </p>
      </div>

      {/* PIPELINE STEPPER BUTTONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {architectureStages.map((stage, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTier(idx)}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedTier === idx
                ? "bg-gradient-to-r from-horizon-orange/15 to-horizon-amber/15 border-horizon-amber text-white shadow-lg shadow-orange-500/10"
                : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/15 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-horizon-amber tracking-wider">
                Tier {stage.tier}
              </span>
              <span className="w-2 h-2 rounded-full bg-horizon-green animate-pulse" />
            </div>
            <p className="text-xs font-bold text-white line-clamp-1">{stage.name}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{stage.latency}</p>
          </button>
        ))}
      </div>

      {/* SELECTED STAGE DETAILED DISPLAY */}
      <motion.div
        key={selectedTier}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-horizon-orange to-horizon-amber flex items-center justify-center text-black shadow-lg">
              <Icon className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-horizon-amber uppercase tracking-wider">
                  Tier {activeStage.tier} Specifications
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-horizon-green font-semibold">
                  Status: {activeStage.status}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {activeStage.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-right">
              <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Latency Target</span>
              <span className="text-sm font-bold text-horizon-amber">{activeStage.latency}</span>
            </div>
            <button
              onClick={() => onInquireTier(activeStage.name)}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-horizon-orange to-horizon-amber hover:scale-105 transition-all shadow-md"
            >
              Inquire Architecture
            </button>
          </div>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          {activeStage.desc}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {activeStage.specs.map((spec, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-zinc-300"
            >
              <CheckCircle2 className="w-4 h-4 text-horizon-amber shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold text-zinc-300">Active Protocols & Stack:</span>
          <span className="font-mono text-horizon-amber">{activeStage.tech}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= MAIN SERVICES SECTION ================= */
export default function Services() {
  const [activeTab, setActiveTab] = useState("catalog"); // "catalog" | "builder" | "blueprint"
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingService, setInspectingService] = useState(null);

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

  /* FILTER SERVICES BY SEARCH & CATEGORY */
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchCat =
        activeCategory === "All" || s.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;

      const matchText =
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.techStack.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchText;
    });
  }, [activeCategory, searchQuery]);

  /* SCROLL AND PREFILL CONTACT FORM */
  const scrollToContact = (customSubject, customMessage) => {
    if (customSubject || customMessage) {
      window.dispatchEvent(
        new CustomEvent("horizon-select-service", {
          detail: {
            subject: customSubject,
            message: customMessage,
          },
        })
      );
    }
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquireService = (service) => {
    scrollToContact(
      `[Inquiry] ${service.title}`,
      `Hello Horizon IT team,\n\nI am interested in learning more about your "${service.title}" capabilities. Here is an overview of what our organization needs:`
    );
  };

  return (
    <section
      id="services"
      onMouseMove={handleMove}
      className="relative py-28 lg:py-36 bg-transparent text-white overflow-hidden"
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
        {/* TOP HEADER (SCROLL UP & DOWN ANIMATION) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-horizon-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
                Capabilities & Solutions
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Engineered For Scalability,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
                Built For Performance
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
              From mission-critical software systems to cloud architectures, explore our catalog or use the interactive builder to scope your technical horizon.
            </p>
          </div>

          {/* VIEW SWITCHER TABS */}
          <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto shadow-xl">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "catalog"
                  ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-md shadow-orange-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Services Catalog
            </button>
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "builder"
                  ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-md shadow-orange-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Scope Builder
            </button>
            <button
              onClick={() => setActiveTab("blueprint")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "blueprint"
                  ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black shadow-md shadow-orange-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pipeline Visualizer
            </button>
          </div>
        </motion.div>

        {/* TAB 1: CATALOG VIEW */}
        {activeTab === "catalog" && (
          <div className="space-y-8">
            {/* SEARCH AND CATEGORY FILTER BAR */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl"
            >
              {/* SEARCH INPUT */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search capabilities, tech, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-horizon-amber transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* CATEGORY PILLS */}
              <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-zinc-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* SERVICES GRID */}
            {filteredServices.length > 0 ? (
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
              >
                <AnimatePresence>
                  {filteredServices.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 35, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.15 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                      className="h-full"
                    >
                      <ServiceCard
                        service={service}
                        onInspect={(s) => setInspectingService(s)}
                        onInquire={(s) => handleInquireService(s)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-16 px-4 rounded-3xl bg-zinc-950/60 border border-white/5">
                <Search className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
                <p className="text-white font-semibold text-base mb-1">
                  No matching services found
                </p>
                <p className="text-zinc-400 text-xs mb-4">
                  Try adjusting your search terms or clearing the filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-horizon-orange to-horizon-amber"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INTERACTIVE SCOPE BUILDER */}
        {activeTab === "builder" && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <SolutionBuilder
              onTransferScope={(subj, msg) => scrollToContact(subj, msg)}
            />
          </motion.div>
        )}

        {/* TAB 3: ARCHITECTURE VISUALIZER */}
        {activeTab === "blueprint" && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <ArchitectureVisualizer
              onInquireTier={(tierName) =>
                scrollToContact(
                  `[Architecture Inquiry] ${tierName}`,
                  `Hello Horizon IT,\n\nI would like to discuss deploying and optimizing the ${tierName} for our project architecture.`
                )
              }
            />
          </motion.div>
        )}

        {/* BOTTOM ACTION BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Need a custom tailored solution?
            </h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              From end-to-end architectural overhauls to specialized software builds, our engineers are ready to execute your vision.
            </p>
          </div>

          <button
            onClick={() => scrollToContact("[Consultation Request]", "I'd like to schedule a technical consultation regarding our project.")}
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Schedule a Technical Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {inspectingService && (
          <ServiceModal
            service={inspectingService}
            onClose={() => setInspectingService(null)}
            onSelect={(s) => handleInquireService(s)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}