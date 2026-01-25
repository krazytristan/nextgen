import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const sections = ["home", "about", "services", "team", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();

  /* ================= SCROLL BEHAVIOR ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
      setScrolled(y > 50);

      if (y > lastScrollY.current + 8 && y > 140) {
        setHidden(true);
      } else if (y < lastScrollY.current - 8) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-120px 0px -35% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ================= MOBILE UX ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ================= SCROLL PROGRESS ================= */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[70] bg-black/5">
        <motion.div
          className="h-full bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-green"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/70 shadow-lg"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between py-3">
          {/* LOGO */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.06 }}
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 ring-horizon-orange rounded-md"
          >
            <motion.div
              animate={reduceMotion ? {} : { rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-horizon-orange to-horizon-amber text-white flex items-center justify-center font-bold shadow-md"
            >
              H
            </motion.div>
            <span className="fw-bold text-xl tracking-wide text-horizon-orange">
              Horizon IT
            </span>
          </motion.a>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-10">
            {sections.map((item) => (
              <li key={item} className="relative">
                <a
                  href={`#${item}`}
                  className={`fw-medium transition-colors duration-300 ${
                    active === item
                      ? "text-horizon-orange"
                      : "text-gray-700 hover:text-horizon-orange"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>

                {active === item && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-gradient-to-r from-horizon-orange to-horizon-green"
                  />
                )}
              </li>
            ))}

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-horizon-orange to-horizon-amber shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 ring-horizon-orange"
            >
              Get Started
            </motion.a>
          </ul>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-3xl text-horizon-orange focus:outline-none focus-visible:ring-2 ring-horizon-orange rounded"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 p-8 flex flex-col shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="self-end text-2xl text-horizon-orange mb-10"
                aria-label="Close menu"
              >
                ✕
              </button>

              <ul className="flex flex-col gap-6">
                {sections.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setOpen(false)}
                    className={`text-xl fw-medium transition ${
                      active === item
                        ? "text-horizon-orange"
                        : "text-gray-700 hover:text-horizon-orange"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto text-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-horizon-orange to-horizon-amber shadow-lg"
              >
                Get Started
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
