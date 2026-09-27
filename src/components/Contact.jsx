'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

/* EMAILJS CONFIG */
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  /* LISTEN FOR INTERACTIVE SERVICE SELECTION */
  useEffect(() => {
    const handleSelectService = (e) => {
      if (e.detail) {
        setForm((prev) => ({
          ...prev,
          subject: e.detail.subject || prev.subject,
          message: e.detail.message ? (prev.message ? `${prev.message}\n\n${e.detail.message}` : e.detail.message) : prev.message,
        }));
      }
    };
    window.addEventListener("horizon-select-service", handleSelectService);
    return () => window.removeEventListener("horizon-select-service", handleSelectService);
  }, []);

  /* CURSOR GLOW EFFECT */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px at ${x}px ${y}px, rgba(236,143,94,0.12), transparent 80%)`
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* MAGNETIC BUTTON */
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const handleMagnet = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const resetMagnet = () => {
    animate(btnX, 0, { type: "spring", stiffness: 200, damping: 15 });
    animate(btnY, 0, { type: "spring", stiffness: 200, damping: 15 });
  };

  /* VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email address";
    if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      if (SERVICE_ID !== "YOUR_SERVICE_ID") {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject || "New Inquiry",
            message: form.message,
          },
          PUBLIC_KEY
        );
      } else {
        // Fallback simulation when keys not configured yet
        await new Promise((res) => setTimeout(res, 1200));
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMove}
      className="relative py-28 lg:py-36 bg-black text-white overflow-hidden"
    >
      {/* GLOW OVERLAY */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glow }}
      />

      {/* AMBIENT RADIAL LIGHTS */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-horizon-orange/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-horizon-amber/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-horizon-amber" />
            <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
              Initiate Collaboration
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Let’s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
              Extraordinary
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            Have a project in mind, need technical advisory, or want to explore an enterprise system? Reach out and our engineering leads will respond promptly.
          </p>
        </div>

        {/* CONTACT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: INFO TILES */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-horizon-amber" />
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-6">
                <ContactInfoItem
                  icon={MapPin}
                  title="Headquarters"
                  text="Lipa City, Batangas, Philippines"
                  accent="from-horizon-orange to-horizon-amber"
                />

                <ContactInfoItem
                  icon={Mail}
                  title="Direct Inquiries"
                  text="infohorizonitsolutions@gmail.com"
                  href="mailto:infohorizonitsolutions@gmail.com"
                  accent="from-horizon-amber to-horizon-yellow"
                />

                <ContactInfoItem
                  icon={Phone}
                  title="Technical Hotline"
                  text="+63 993 220 5328"
                  href="tel:+639932205328"
                  accent="from-horizon-yellow to-horizon-green"
                />

                <ContactInfoItem
                  icon={Clock}
                  title="Operating Hours"
                  text="Mon – Sat: 8:00 AM – 6:00 PM (PHT)"
                  accent="from-horizon-green to-horizon-orange"
                />
              </div>

              {/* SLA ASSURANCE CARD */}
              <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-horizon-green/20 border border-horizon-green/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-horizon-green" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Guaranteed Response SLA</p>
                  <p className="text-[11px] text-zinc-400">Our engineering leads reply within 24 business hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <FormField
                label="Project Subject (Optional)"
                name="subject"
                placeholder="e.g. Web System Development / Cloud Migration"
                value={form.subject}
                onChange={handleChange}
              />

              <FormField
                textarea
                label="Project Overview & Requirements"
                name="message"
                placeholder="Briefly describe your objectives, timeline, tech requirements, or challenges..."
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />

              {/* SUBMIT BUTTON */}
              <motion.button
                type="submit"
                disabled={loading}
                style={{ x: btnX, y: btnY }}
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 shadow-xl transition-all duration-200 ${
                  loading
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry</span>
                  </>
                )}
              </motion.button>

              {/* STATUS ALERTS */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-horizon-green/15 border border-horizon-green/40 text-horizon-green flex items-center gap-3 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Thank you! Your message has been received. We will reach out shortly.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 flex items-center gap-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>Failed to transmit message. Please contact us directly via email.</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ================= CONTACT INFO ITEM ================= */
function ContactInfoItem({ icon: Icon, title, text, href, accent }) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div
        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-black shrink-0 shadow-md group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-5 h-5 stroke-[2.2]" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </p>
        <p className="text-sm font-medium text-white group-hover:text-horizon-amber transition-colors mt-0.5">
          {text}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

/* ================= FORM FIELD COMPONENT ================= */
function FormField({ label, name, value, onChange, error, textarea, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={5}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
            error
              ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
              : "border-white/10 focus:border-horizon-amber focus:ring-horizon-amber"
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all ${
            error
              ? "border-red-500/80 focus:ring-red-500 focus:border-red-500"
              : "border-white/10 focus:border-horizon-amber focus:ring-horizon-amber"
          }`}
        />
      )}

      {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>}
    </div>
  );
}