'use client';

import { motion, useMotionValue, animate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTelegramPlane,
  faViber,
  faUpwork,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {

  /* 🧲 MAGNETIC BUTTON */
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const handleMagnet = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const resetMagnet = () => {
    animate(btnX, 0, { type: "spring", stiffness: 200 });
    animate(btnY, 0, { type: "spring", stiffness: 200 });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#7fa95e] to-horizon-green text-white overflow-hidden">

      {/* 🌈 ANIMATED TOP BORDER */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[4px]"
        animate={{
          background: [
            "linear-gradient(90deg,#ff7a18,#ffc107,#32d2aa)",
            "linear-gradient(180deg,#32d2aa,#ff7a18,#ffc107)",
            "linear-gradient(270deg,#ffc107,#32d2aa,#ff7a18)"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* 💎 AMBIENT GLOW */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-white/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] left-[-160px] w-[520px] h-[520px] bg-black/10 rounded-full blur-[160px]" />

      <div className="relative container py-20 md:py-24">

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-5">

              {/* 🔥 UPDATED BRAND (NO N9) */}
              <div className="w-11 h-11 rounded-xl bg-white/20
                              flex items-center justify-center
                              font-bold shadow text-sm">
                NG
              </div>

              <h4 className="font-bold text-xl leading-tight">
                Nexgen IT Solutions
              </h4>
            </div>

            <p className="text-white/80 text-sm md:text-base max-w-sm mb-7">
              Delivering smart, secure, and scalable IT solutions that help
              organizations grow and innovate in the digital era.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: faLinkedinIn, href: "#" },
                { icon: faFacebookF, href: "#" },
                { icon: faInstagram, href: "#" },
                { icon: faTelegramPlane, href: "#" },
                { icon: faViber, href: "#" },
                { icon: faUpwork, href: "#" },
                { icon: faTiktok, href: "#" },
                { icon: faEnvelope, href: "mailto:infohorizonitsolutions@gmail.com" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 rounded-full bg-white/20
                             flex items-center justify-center
                             hover:bg-white/30 transition shadow"
                >
                  <FontAwesomeIcon icon={s.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COMPANY */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h6 className="font-semibold mb-4 uppercase text-xs tracking-wide">
              Company
            </h6>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#team" className="hover:text-white">Team</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h6 className="font-semibold mb-4 uppercase text-xs tracking-wide">
              Services
            </h6>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Web Development</li>
              <li>System Development</li>
              <li>Cloud Solutions</li>
              <li>IT Support</li>
              <li>Cybersecurity</li>
            </ul>
          </motion.div>

          {/* TEAM CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h6 className="font-semibold mb-4 uppercase text-xs tracking-wide">
              Our Team
            </h6>

            <p className="text-white/80 text-sm mb-5">
              Meet the professionals behind Nexgen IT Solutions — engineers,
              developers, and innovators working together.
            </p>

            <motion.a
              href="#team"
              style={{ x: btnX, y: btnY }}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2
                         px-5 py-2.5 rounded-full text-sm
                         bg-gradient-to-r from-horizon-orange to-horizon-amber
                         shadow-lg hover:shadow-xl transition"
            >
              Meet the Team →
            </motion.a>
          </motion.div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/20 my-10 md:my-12" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/70">

          <p>
            © {new Date().getFullYear()} Nexgen IT Solutions. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>

          <motion.a
            href="#home"
            whileHover={{ scale: 1.1, y: -2 }}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs"
          >
            ↑ Back to top
          </motion.a>

        </div>
      </div>
    </footer>
  );
}