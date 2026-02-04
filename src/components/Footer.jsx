import { motion } from "framer-motion";
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
  return (
    <footer className="relative bg-gradient-to-b from-[#7fa95e] to-horizon-green text-white overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[4px]
                      bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-green" />

      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] left-[-160px] w-[520px] h-[520px] bg-black/10 rounded-full blur-3xl" />

      <div className="relative container py-24">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/20
                              flex items-center justify-center
                              font-bold text-lg shadow">
                N9
              </div>
              <h4 className="font-bold text-xl">
                NEXTGEN 9 IT SOLUTIONS
              </h4>
            </div>

            <p className="text-white/80 max-w-sm mb-7">
              Delivering smart, secure, and scalable IT solutions that help
              organizations grow and innovate in the digital era.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: faLinkedinIn, label: "LinkedIn", href: "#" },
                { icon: faFacebookF, label: "Facebook", href: "#" },
                { icon: faInstagram, label: "Instagram", href: "#" },
                { icon: faTelegramPlane, label: "Telegram", href: "#" },
                { icon: faViber, label: "Viber", href: "#" },
                { icon: faUpwork, label: "Upwork", href: "#" },
                { icon: faTiktok, label: "TikTok", href: "#" },
                { icon: faEnvelope, label: "Email", href: "mailto:info@nextgen9.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/20
                             flex items-center justify-center
                             hover:bg-white/30 hover:scale-105
                             transition shadow"
                >
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* COMPANY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h6 className="font-semibold mb-4 uppercase tracking-wide text-sm">
              Company
            </h6>
            <ul className="space-y-3 text-white/80">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#team" className="hover:text-white transition">Team</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <h6 className="font-semibold mb-4 uppercase tracking-wide text-sm">
              Services
            </h6>
            <ul className="space-y-3 text-white/80">
              <li>Web Development</li>
              <li>System Development</li>
              <li>Cloud Solutions</li>
              <li>IT Support</li>
              <li>Cybersecurity</li>
            </ul>
          </motion.div>

          {/* TEAM CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <h6 className="font-semibold mb-4 uppercase tracking-wide text-sm">
              Our Team
            </h6>

            <p className="text-white/80 mb-5">
              Meet the professionals behind NEXTGEN 9 — engineers, developers,
              and innovators working together.
            </p>

            <a
              href="#team"
              className="inline-flex items-center gap-3
                         px-6 py-3 rounded-full
                         bg-gradient-to-r from-horizon-orange to-horizon-amber
                         text-white shadow hover:shadow-xl transition"
            >
              Meet the Team →
            </a>
          </motion.div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-white/20 my-14" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row
                        justify-between items-center
                        gap-6 text-white/70 text-sm">
          <p>
            © {new Date().getFullYear()} NEXTGEN 9 IT SOLUTIONS. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>

          {/* BACK TO TOP */}
          <a
            href="#home"
            className="flex items-center gap-2
                       px-5 py-2 rounded-full
                       bg-white/20 hover:bg-white/30
                       transition shadow"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
