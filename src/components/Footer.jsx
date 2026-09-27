'use client';

import { motion, useMotionValue, animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTelegramPlane,
  faViber,
  faUpwork,
  faTiktok,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { ArrowUp, Sparkles, ArrowRight } from "lucide-react";

export default function Footer() {
  /* 🧲 MAGNETIC BUTTON */
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: faLinkedinIn, href: "https://linkedin.com", name: "LinkedIn" },
    { icon: faGithub, href: "https://github.com/krazytristan", name: "GitHub" },
    { icon: faFacebookF, href: "#", name: "Facebook" },
    { icon: faInstagram, href: "#", name: "Instagram" },
    { icon: faTelegramPlane, href: "#", name: "Telegram" },
    { icon: faViber, href: "#", name: "Viber" },
    { icon: faUpwork, href: "#", name: "Upwork" },
    { icon: faTiktok, href: "#", name: "TikTok" },
    { icon: faEnvelope, href: "mailto:infohorizonitsolutions@gmail.com", name: "Email" },
  ];

  return (
    <footer className="relative bg-zinc-950 border-t border-white/10 text-white overflow-hidden">
      {/* 🌈 SUBTLE AMBIENT ACCENT LINE */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-horizon-amber to-transparent opacity-60" />

      {/* AMBIENT GLOW */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-horizon-orange/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-horizon-amber/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-horizon-orange via-horizon-amber to-horizon-yellow flex items-center justify-center font-black text-black text-sm shadow-md group-hover:scale-105 transition-transform">
                H9
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-white tracking-tight">
                  HORIZON IT SOLUTIONS
                </span>
                <span className="text-[11px] text-zinc-400">
                  Next-Gen Digital Systems
                </span>
              </div>
            </a>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-7">
              Delivering high-performance, secure, and scalable IT solutions that empower organizations to innovate and dominate in the digital era.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-black hover:bg-horizon-amber hover:border-horizon-amber transition-colors shadow"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-xs" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2">
            <h6 className="font-bold text-xs uppercase tracking-widest text-horizon-amber mb-5">
              Navigation
            </h6>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES LINKS */}
          <div className="lg:col-span-3">
            <h6 className="font-bold text-xs uppercase tracking-widest text-horizon-amber mb-5">
              Core Capabilities
            </h6>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>Custom Enterprise Software</li>
              <li>Web & Mobile App Systems</li>
              <li>Cloud Architecture & DevOps</li>
              <li>Systems & API Integration</li>
              <li>Cybersecurity & Compliance</li>
            </ul>
          </div>

          {/* CTA & DIRECT INQUIRY */}
          <div className="lg:col-span-3">
            <h6 className="font-bold text-xs uppercase tracking-widest text-horizon-amber mb-5">
              Ready to Accelerate?
            </h6>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Let's engineer a solution built specifically for your enterprise growth.
            </p>

            <motion.a
              href="#contact"
              style={{ x: btnX, y: btnY }}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} Horizon IT Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#about" className="hover:text-zinc-300 transition-colors">Security</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}