'use client';

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  Inbox,
  Layers,
  Users,
  Cpu,
  Bot,
  Lock,
  Settings,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Plus,
  RefreshCw,
  Download,
  Trash2,
  Mail,
  Send,
  X,
  Sparkles,
  Server,
  Activity,
  Globe,
  Sliders,
  Check,
  Eye,
  ChevronRight,
  TrendingUp,
  Database,
  Terminal,
  Filter,
} from "lucide-react";

/* ================= DEFAULT SEEDED INQUIRIES ================= */
const INITIAL_INQUIRIES = [
  {
    id: "INQ-9481",
    name: "Alexander Wright",
    email: "a.wright@vanguard-holdings.com",
    subject: "[Enterprise Scope] Custom ERP & Multi-Tenant Portal",
    message:
      "We require a resilient, multi-tenant enterprise portal capable of orchestrating 10,000+ daily transactions across 8 international offices. Need zero-downtime database migrations.",
    date: "2026-11-17 14:22",
    priority: "Urgent",
    status: "New",
    budget: "$45,000 - $75,000",
  },
  {
    id: "INQ-9480",
    name: "Dr. Evelyn Vance",
    email: "evelyn@aerotech-dynamics.io",
    subject: "[Cloud Migration] AWS Microservices & DevOps Cluster",
    message:
      "Looking to decouple our monolithic processing pipeline into Kubernetes clusters with automated telemetry and 99.99% availability.",
    date: "2026-11-16 09:45",
    priority: "High",
    status: "In Review",
    budget: "$30,000 - $50,000",
  },
  {
    id: "INQ-9479",
    name: "Marcus Sterling",
    email: "marcus@finpulse.global",
    subject: "[FinTech Mobile App] Biometric Authentication & Real-Time Sync",
    message:
      "Developing a high-frequency cross-platform fintech wallet application with end-to-end encryption and sub-second payment settlements.",
    date: "2026-11-15 18:10",
    priority: "Normal",
    status: "Contacted",
    budget: "$60,000+",
  },
  {
    id: "INQ-9478",
    name: "Samantha Brooks",
    email: "s.brooks@nexuslogistics.ph",
    subject: "[Architecture Review] Fleet Telemetry & IoT Dashboard",
    message:
      "We have 800+ freight vehicles requiring real-time GPS telemetry ingestion, predictive maintenance scheduling, and automated compliance reporting.",
    date: "2026-11-14 11:30",
    priority: "Normal",
    status: "Completed",
    budget: "$25,000 - $40,000",
  },
];

/* ================= DEFAULT SEEDED SCOPES ================= */
const INITIAL_SCOPES = [
  {
    id: "SCP-2041",
    solution: "Custom Enterprise Software",
    scale: "Enterprise Tier (100k+ Users)",
    modules: ["Real-Time Collaboration", "Enterprise Security Audit", "CI/CD & DevOps Engine"],
    estimatedWeeks: 14,
    stack: "React 19, Node.js, PostgreSQL, Redis, Docker, AWS",
    date: "2026-11-17 10:15",
    client: "Apex Global Logistics",
  },
  {
    id: "SCP-2040",
    solution: "High-Performance Web & SaaS",
    scale: "Scale-Up (10k - 100k Users)",
    modules: ["Real-Time Collaboration", "Advanced Analytics & Telemetry"],
    estimatedWeeks: 8,
    stack: "Next.js 15, Supabase, Tailwind CSS, GraphQL",
    date: "2026-11-16 16:30",
    client: "Pulse Commerce Suite",
  },
  {
    id: "SCP-2039",
    solution: "Cloud Infrastructure & DevOps",
    scale: "High-Availability Multi-Region",
    modules: ["Zero-Trust Security", "Automated Load Balancing", "Telemetry Guard"],
    estimatedWeeks: 10,
    stack: "AWS EKS, Terraform, Prometheus, Cloudflare",
    date: "2026-11-15 11:00",
    client: "OmniHealth Networks",
  },
];

export default function AdminPortal({ onBackToSite }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, inquiries, scopes, team, services, ai-logs, security, settings
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem("horizon_inquiries");
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [scopes, setScopes] = useState(() => {
    try {
      const stored = localStorage.getItem("horizon_scopes");
      return stored ? JSON.parse(stored) : INITIAL_SCOPES;
    } catch {
      return INITIAL_SCOPES;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replySuccess, setReplySuccess] = useState(false);
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("horizon_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("horizon_scopes", JSON.stringify(scopes));
  }, [scopes]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  /* METRICS CALCULATION */
  const metrics = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "New").length;
    const urgentCount = inquiries.filter((i) => i.priority === "Urgent").length;
    return {
      totalInquiries: total,
      newInquiries: newCount,
      urgentInquiries: urgentCount,
      activeProjects: 18,
      uptimeSla: "99.992%",
      avgResponseTime: "12m",
      clusterLoad: "32%",
      edgeNodes: "24 / 24 Online",
    };
  }, [inquiries]);

  /* FILTERED INQUIRIES */
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        filterPriority === "All" || item.priority === filterPriority;
      const matchesStatus =
        filterStatus === "All" || item.status === filterStatus;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [inquiries, searchQuery, filterPriority, filterStatus]);

  /* STATUS UPDATE HANDLER */
  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    showToast(`Updated ${id} status to "${newStatus}"`);
  };

  /* DELETE INQUIRY */
  const handleDeleteInquiry = (id) => {
    if (window.confirm(`Are you sure you want to delete inquiry ${id}?`)) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      showToast(`Inquiry ${id} removed.`);
    }
  };

  /* DELETE SCOPE */
  const handleDeleteScope = (id) => {
    if (window.confirm(`Are you sure you want to delete configured scope ${id}?`)) {
      setScopes((prev) => prev.filter((s) => s.id !== id));
      showToast(`Scope ${id} removed.`);
    }
  };

  /* SEND SIMULATED REPLY */
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setReplySuccess(true);
    setTimeout(() => {
      updateInquiryStatus(selectedInquiry.id, "Contacted");
      setReplyText("");
      setReplySuccess(false);
      showToast(`Reply transmitted to ${selectedInquiry.email}`);
    }, 1200);
  };

  /* EXPORT INQUIRIES TO CSV */
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Priority", "Status", "Date", "Message"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name}"`,
      `"${i.email}"`,
      `"${i.subject.replace(/"/g, '""')}"`,
      i.priority,
      i.status,
      i.date,
      `"${i.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `horizon_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported inquiries to CSV.");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-horizon-amber selection:text-black font-sans pb-16">
      {/* ================= TOP COMMAND BAR ================= */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-horizon-orange via-horizon-amber to-horizon-yellow flex items-center justify-center font-black text-black text-sm shadow-lg shadow-orange-500/20">
              H9
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  HORIZON IT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-horizon-amber/20 text-horizon-amber border border-horizon-amber/30">
                  Admin Command Center
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-horizon-green animate-pulse" />
                <span>Cluster: PH-LIPA-NODE-01 (All Systems Operational)</span>
              </p>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold flex items-center gap-1.5 hover:bg-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-horizon-amber" />
            <span>Site</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 self-end md:self-auto">
          <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400 font-mono">
            <span>SLA: {metrics.uptimeSla}</span>
            <span>•</span>
            <span>Latency: 24ms</span>
            <span>•</span>
            <span className="text-horizon-green font-semibold">Protected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-horizon-amber text-black font-black text-xs flex items-center justify-center">
                T
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold leading-tight">Tristan Cuartero</p>
                <p className="text-[10px] text-horizon-amber font-mono">Super Admin</p>
              </div>
            </div>

            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-horizon-orange to-horizon-amber text-black text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= SECONDARY NAVIGATION TABS ================= */}
      <div className="bg-zinc-900/60 border-b border-white/5 px-4 sm:px-8 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {[
            { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
            { id: "inquiries", label: `Client Inquiries (${metrics.newInquiries} New)`, icon: Inbox },
            { id: "scopes", label: `Project Scopes (${scopes.length})`, icon: Sliders },
            { id: "team", label: "Team & Staff Roster", icon: Users },
            { id: "services", label: "Capabilities & SLA", icon: Cpu },
            { id: "ai-logs", label: "AI Assistant Telemetry", icon: Bot },
            { id: "security", label: "Security & Audit Logs", icon: Shield },
            { id: "settings", label: "Platform Config", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-horizon-orange/20 to-horizon-amber/20 border border-horizon-amber text-white shadow-md shadow-orange-500/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-horizon-amber" : "text-zinc-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN ADMIN BODY ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* TOAST ALERT */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-8 z-50 px-4 py-3 rounded-2xl bg-zinc-900 border border-horizon-amber text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-horizon-green" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= TAB 1: EXECUTIVE OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Total Inquiries
                  </span>
                  <Inbox className="w-4 h-4 text-horizon-amber" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{metrics.totalInquiries}</span>
                  <span className="text-xs text-horizon-green font-semibold">+{metrics.newInquiries} new</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">Active pipeline leads</p>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    System Uptime
                  </span>
                  <Server className="w-4 h-4 text-horizon-green" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-horizon-green">{metrics.uptimeSla}</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">Zero unannounced downtime</p>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Configured Scopes
                  </span>
                  <Sliders className="w-4 h-4 text-horizon-orange" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{scopes.length}</span>
                  <span className="text-xs text-horizon-amber font-semibold">Architectures</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">From Interactive Builder</p>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Avg Reply Velocity
                  </span>
                  <Clock className="w-4 h-4 text-horizon-yellow" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{metrics.avgResponseTime}</span>
                  <span className="text-xs text-zinc-400">Target &lt; 24h</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">SLA compliance 99.4%</p>
              </div>
            </div>

            {/* LIVE TELEMETRY & SYSTEM HEALTH PANEL */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-horizon-amber" />
                      <span>Live Infrastructure Telemetry</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Edge cluster health, server resource consumption, and microservices status
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-horizon-green/10 text-horizon-green border border-horizon-green/30">
                    24 / 24 Nodes Healthy
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-zinc-400 block mb-1">Compute Load</span>
                    <span className="text-2xl font-black text-white">{metrics.clusterLoad}</span>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-horizon-amber w-[32%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-zinc-400 block mb-1">Database Queries / Sec</span>
                    <span className="text-2xl font-black text-white">1,420 QPS</span>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-horizon-green w-[48%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-zinc-400 block mb-1">SSL Certificate</span>
                    <span className="text-2xl font-black text-white">Valid (TLS 1.3)</span>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-horizon-orange w-[100%]" />
                    </div>
                  </div>
                </div>

                {/* RECENT INCOMING INQUIRIES PREVIEW */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Incoming Client Messages
                    </h4>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="text-xs text-horizon-amber hover:underline flex items-center gap-1"
                    >
                      <span>Manage All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {inquiries.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedInquiry(item);
                          setActiveTab("inquiries");
                        }}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-horizon-amber/40 cursor-pointer transition flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xs text-white truncate">{item.name}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-[11px] text-zinc-400 truncate">{item.email}</span>
                          </div>
                          <p className="text-xs text-zinc-300 truncate">{item.subject}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.priority === "Urgent"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-horizon-amber/20 text-horizon-amber"
                            }`}
                          >
                            {item.priority}
                          </span>
                          <span className="text-[11px] text-zinc-500">{item.date.split(" ")[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT QUICK ACTIONS & SHORTCUTS */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-horizon-amber flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>Quick Admin Controls</span>
                  </h3>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-between transition"
                    >
                      <span>Review Inquiries</span>
                      <span className="px-2 py-0.5 rounded-full bg-horizon-amber text-black text-[10px] font-bold">
                        {metrics.newInquiries} New
                      </span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-between transition"
                    >
                      <span>Export Inquiries CSV</span>
                      <Download className="w-3.5 h-3.5 text-horizon-amber" />
                    </button>

                    <button
                      onClick={() => setActiveTab("scopes")}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-between transition"
                    >
                      <span>Project Scope Submissions</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab("security")}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 flex items-center justify-between transition"
                    >
                      <span>Audit & Security Logs</span>
                      <Shield className="w-3.5 h-3.5 text-horizon-green" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-horizon-orange/15 to-horizon-amber/15 border border-horizon-amber/30 space-y-3">
                  <div className="flex items-center gap-2 text-horizon-amber">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Executive Advisory</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">System Capacity Alert</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Edge node capacity is currently operating at 32%. No auto-scaling threshold breaches in the past 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CLIENT INQUIRIES MANAGER ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Client Inquiries & Project Requests
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage incoming client messages, prioritize urgent leads, and transmit official responses.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 text-zinc-300 hover:text-white transition"
                >
                  <Download className="w-3.5 h-3.5 text-horizon-amber" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* SEARCH & FILTERS BAR */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950/80 border border-white/10">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by ID, client name, email, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-horizon-amber transition"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-zinc-400 font-semibold uppercase">Priority:</span>
                {["All", "Urgent", "High", "Normal"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      filterPriority === p
                        ? "bg-horizon-amber text-black"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <div className="h-4 w-[1px] bg-white/10 mx-1" />

                <span className="text-[11px] text-zinc-400 font-semibold uppercase">Status:</span>
                {["All", "New", "In Review", "Contacted", "Completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      filterStatus === s
                        ? "bg-white/20 text-white border border-white/20"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* INQUIRIES LIST / TABLE */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className={`${selectedInquiry ? "lg:col-span-6 xl:col-span-7" : "lg:col-span-12"} space-y-3`}>
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <div
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-zinc-900/90 border-horizon-amber shadow-lg shadow-orange-500/10"
                            : "bg-zinc-950/70 border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-horizon-amber">{inq.id}</span>
                            <span className="text-white font-bold text-sm">{inq.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                inq.priority === "Urgent"
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : inq.priority === "High"
                                  ? "bg-orange-500/20 text-orange-300"
                                  : "bg-zinc-800 text-zinc-300"
                              }`}
                            >
                              {inq.priority}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                inq.status === "New"
                                  ? "bg-horizon-green/20 text-horizon-green border border-horizon-green/30"
                                  : inq.status === "In Review"
                                  ? "bg-horizon-amber/20 text-horizon-amber"
                                  : "bg-white/10 text-zinc-300"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs font-semibold text-white mb-1.5">{inq.subject}</p>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{inq.message}</p>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[11px] text-zinc-500">
                          <span>{inq.email}</span>
                          <span>{inq.date}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 rounded-3xl bg-zinc-950/60 border border-white/5 text-center">
                    <Inbox className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                    <p className="text-white font-bold text-sm">No matching inquiries</p>
                    <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or filters.</p>
                  </div>
                )}
              </div>

              {/* SELECTED INQUIRY DETAIL & REPLY DRAWER */}
              {selectedInquiry && (
                <div className="lg:col-span-6 xl:col-span-5 p-6 rounded-3xl bg-zinc-950/95 border border-white/15 shadow-2xl space-y-6 sticky top-28">
                  <div className="flex items-start justify-between pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-horizon-amber">
                          {selectedInquiry.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-zinc-300">
                          {selectedInquiry.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-white">{selectedInquiry.name}</h4>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-xs text-horizon-amber hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* STATUS SELECTOR */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      Update Ticket Status
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["New", "In Review", "Contacted", "Completed"].map((st) => (
                        <button
                          key={st}
                          onClick={() => updateInquiryStatus(selectedInquiry.id, st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                            selectedInquiry.status === st
                              ? "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black font-bold"
                              : "bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* MESSAGE BODY */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-white">{selectedInquiry.subject}</p>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                      {selectedInquiry.message}
                    </p>
                    <div className="text-[10px] text-zinc-500 pt-2 border-t border-white/5 flex justify-between">
                      <span>Submitted: {selectedInquiry.date}</span>
                      {selectedInquiry.budget && <span>Budget: {selectedInquiry.budget}</span>}
                    </div>
                  </div>

                  {/* QUICK REPLY BOX */}
                  <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-white/10">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Transmit Official Engineering Reply</span>
                      <Mail className="w-3.5 h-3.5 text-horizon-amber" />
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Draft reply to ${selectedInquiry.name}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-horizon-amber transition"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                        className="p-2.5 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition text-xs flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>

                      <button
                        type="submit"
                        disabled={replySuccess || !replyText.trim()}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                          replySuccess
                            ? "bg-horizon-green text-black"
                            : "bg-gradient-to-r from-horizon-orange to-horizon-amber text-black hover:scale-105 active:scale-95"
                        }`}
                      >
                        {replySuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Transmitted!</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Reply</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROJECT SCOPES ================= */}
        {activeTab === "scopes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Configured Architectural Scopes
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Generated via the client-side Interactive Solution Architect on the Services page.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-horizon-amber/20 text-horizon-amber self-start sm:self-auto">
                {scopes.length} Active Architecture Estimates
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scopes.map((scope) => (
                <div
                  key={scope.id}
                  className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-horizon-amber/40 shadow-xl transition space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-horizon-amber">{scope.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500">{scope.date}</span>
                      <button
                        onClick={() => handleDeleteScope(scope.id)}
                        className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition"
                        title="Delete Scope"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{scope.solution}</h4>
                    <p className="text-xs text-horizon-amber font-semibold">{scope.scale}</p>
                    <p className="text-xs text-zinc-400 mt-1">Client: {scope.client}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Add-on Modules:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scope.modules.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/5 text-zinc-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-zinc-400 block mb-0.5">Recommended Tech Stack</span>
                    <span className="text-xs font-mono text-zinc-300">{scope.stack}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-zinc-400 font-semibold">Delivery Target:</span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange to-horizon-amber">
                      ~{scope.estimatedWeeks} Weeks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: TEAM & STAFF ROSTER ================= */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Engineering Roster & Leadership Governance
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Oversee Founders, Executives, and Division Specialists. Verify portfolio credentials and assignments.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-horizon-green/20 text-horizon-green">
                  12 Active Specialists
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Tristan Jorge Cuartero",
                  role: "Founder & Quality Assurance",
                  unit: "Founders",
                  status: "Active Super Admin",
                  website: "https://personal-website-sage-tau.vercel.app/",
                  email: "tristan.cuartero@horizonit.com",
                  skills: ["System Architecture", "QA Testing", "Strategy", "Web Platforms"],
                },
                {
                  name: "Rodolfo C. Guce III",
                  role: "Co-Founder",
                  unit: "Founders",
                  status: "Active Co-Founder",
                  website: "https://3dportfolio.gucediter03.workers.dev/",
                  email: "rodolfo.guce@horizonit.com",
                  skills: ["System Design", "Backend Engines", "Cloud DevOps"],
                },
                {
                  name: "Elvin Joseph Comia",
                  role: "Chief Operations Officer",
                  unit: "Executives",
                  status: "Executive Lead",
                  email: "ejmc.ggbicas@gmail.com",
                  skills: ["Operations", "Process Optimization", "Agile"],
                },
                {
                  name: "Charles Lois Neil Viñalon",
                  role: "Chief Marketing Officer",
                  unit: "Executives",
                  status: "Executive Lead",
                  skills: ["Brand Strategy", "Market Acquisition", "Growth"],
                },
                {
                  name: "Bejay Allen G. Macatangay",
                  role: "Chief Financial Officer",
                  unit: "Executives",
                  status: "Executive Lead",
                  skills: ["Financial Governance", "Fiscal Strategy"],
                },
                {
                  name: "Florencio John Fonte III",
                  role: "Project Leader",
                  unit: "Executives",
                  status: "Project Delivery",
                  skills: ["Agile Workflows", "Sprint Delivery"],
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-white/25 shadow-xl space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-horizon-amber border border-white/10">
                        {member.unit}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{member.name}</h4>
                      <p className="text-xs text-horizon-amber font-semibold">{member.role}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-horizon-green/15 text-horizon-green">
                      {member.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {member.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    {member.website ? (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-horizon-amber hover:underline flex items-center gap-1"
                      >
                        <span>View Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-zinc-500">Verified Member</span>
                    )}

                    <span className="text-zinc-500 text-[11px]">{member.email || "Protected"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CAPABILITIES & SLA ================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Capabilities, Architecture Tiers & SLA Standards
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Guaranteed response metrics, infrastructure uptime benchmarks, and verified tech stacks.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Tier 1: Global Edge CDN", latency: "< 35ms TTFB", sla: "99.99%", status: "Active" },
                { title: "Tier 2: Microservices Engine", latency: "< 80ms API", sla: "99.95%", status: "Active" },
                { title: "Tier 3: Distributed Database", latency: "< 15ms Query", sla: "99.999%", status: "Active" },
                { title: "Tier 4: Enterprise Cloud Lake", latency: "Sub-second", sla: "99.99%", status: "Active" },
              ].map((tier, i) => (
                <div key={i} className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-horizon-amber">
                      Tier {i + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-horizon-green animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{tier.title}</h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-zinc-400">Target Latency: <span className="text-white font-bold">{tier.latency}</span></p>
                    <p className="text-zinc-400">Guaranteed SLA: <span className="text-horizon-green font-bold">{tier.sla}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: AI ASSISTANT TELEMETRY ================= */}
        {activeTab === "ai-logs" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Horizon AI Assistant Logs & Intelligence Telemetry
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Real-time query routing, resolution rates, and automated fallback monitors.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10">
                <span className="text-xs text-zinc-400 block mb-1">Conversations This Month</span>
                <span className="text-3xl font-black text-white">482</span>
                <p className="text-[11px] text-horizon-green mt-1">+18% inquiry conversions</p>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10">
                <span className="text-xs text-zinc-400 block mb-1">Auto-Resolution Rate</span>
                <span className="text-3xl font-black text-horizon-amber">94.2%</span>
                <p className="text-[11px] text-zinc-400 mt-1">Technical scopes clarified</p>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10">
                <span className="text-xs text-zinc-400 block mb-1">Model Latency</span>
                <span className="text-3xl font-black text-white">180ms</span>
                <p className="text-[11px] text-horizon-green mt-1">Streaming active</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Live Query Telemetry Stream
              </h4>
              <div className="space-y-2 font-mono text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between">
                  <span>[2026-11-17 18:44] User query: "Can Horizon build cross-platform mobile apps?"</span>
                  <span className="text-horizon-green">Resolved (Prompt: mobile)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between">
                  <span>[2026-11-17 17:12] User query: "What is your typical project delivery timeline?"</span>
                  <span className="text-horizon-green">Resolved (Scope: ~6-12w)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between">
                  <span>[2026-11-17 15:05] User query: "Do you offer 24/7 cloud support?"</span>
                  <span className="text-horizon-green">Resolved (SLA: 99.9% Telemetry)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: SECURITY AUDIT LOGS ================= */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Zero-Trust Security & Access Audits
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Perimeter surveillance, TLS 1.3 encryption status, and authenticated session tokens.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-horizon-green/20 text-horizon-green">
                Zero Vulnerabilities Detected
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-3 font-mono text-xs">
              {[
                { time: "2026-11-17 19:00:12", event: "SSL/TLS Certificate verified (Let's Encrypt / Cloudflare Edge)", level: "INFO" },
                { time: "2026-11-17 18:45:00", event: "Admin Session authorized for Tristan Jorge Cuartero (IP 112.198.*.*)", level: "AUTH" },
                { time: "2026-11-17 16:30:22", event: "Automated vulnerability scan completed. 0 CVEs detected.", level: "AUDIT" },
                { time: "2026-11-17 14:15:10", event: "DDoS rate limiting active. 0 malicious requests blocked.", level: "INFO" },
              ].map((log, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-horizon-amber font-bold">{log.level}</span>
                    <span className="text-zinc-300">{log.event}</span>
                  </div>
                  <span className="text-zinc-500 text-[11px] shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 8: PLATFORM SETTINGS ================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Platform Configuration
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Manage notification webhooks, contact routing targets, and API integrations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
              <div>
                <label className="text-xs font-bold text-white block mb-1">
                  Primary Notification Email
                </label>
                <input
                  type="email"
                  defaultValue="infohorizonitsolutions@gmail.com"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-horizon-amber"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">
                  Hotline Contact Number
                </label>
                <input
                  type="text"
                  defaultValue="+63 993 220 5328"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-horizon-amber"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  defaultValue="Lipa City, Batangas, Philippines"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-horizon-amber"
                />
              </div>

              <button
                onClick={() => showToast("Configuration saved successfully.")}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-horizon-orange to-horizon-amber text-black font-bold text-xs hover:scale-105 active:scale-95 transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
