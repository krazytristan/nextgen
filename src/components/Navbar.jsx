import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const sections = ["home", "about", "services", "team", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();

  /* ================= SCROLL HIDE ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current + 10 && y > 120) setHidden(true);
      else if (y < lastScrollY.current - 10) setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      el && observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.header
        initial={reduceMotion ? false : { y: -60, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-4 inset-x-0 z-50"
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className="flex items-center justify-between 
                       h-16 sm:h-[72px] px-4 sm:px-6 
                       rounded-2xl sm:rounded-full
                       bg-white/85 backdrop-blur-xl 
                       shadow-lg border border-white/40"
          >
            {/* BRAND */}
            <a href="#home" className="flex items-center gap-3 min-w-0">
              <div
                className="shrink-0 w-9 h-9 rounded-full 
                           bg-gradient-to-br from-horizon-orange to-horizon-amber 
                           text-white flex items-center justify-center 
                           text-xs font-bold shadow"
              >
                N9
              </div>

              {/* NAME + TAGLINE (VISIBLE ON MOBILE) */}
              <div className="flex flex-col leading-tight truncate">
                <span className="text-xs sm:text-sm fw-bold tracking-wide text-gray-900 truncate">
                  NEXGEN 9 IT SOLUTIONS
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-wide text-gray-500 truncate">
                  Future-Ready Digital Systems
                </span>
              </div>
            </a>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-8 relative">
              {sections.map((item) => (
                <li key={item} className="relative">
                  <a
                    href={`#${item}`}
                    className={`text-sm transition ${
                      active === item
                        ? "text-horizon-orange"
                        : "text-gray-700 hover:text-horizon-orange"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>

                  {active === item && (
                    <motion.span
                      layoutId="navLine"
                      className="absolute -bottom-2 left-0 right-0 
                                 h-[2px] rounded-full 
                                 bg-gradient-to-r from-horizon-orange to-horizon-amber"
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* CTA (DESKTOP ONLY) */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center 
                         px-5 py-2 rounded-full 
                         text-sm fw-semibold text-white
                         bg-gradient-to-r from-horizon-orange to-horizon-amber
                         shadow hover:scale-105 transition"
            >
              Get Started
            </a>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-xl text-gray-800 ml-3"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ===== MOBILE MENU ===== */}
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
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-6 left-4 right-4 
                         bg-white rounded-3xl p-8 z-50 shadow-2xl"
            >
              {/* Mobile Brand */}
              <div className="text-center mb-8">
                <h4 className="fw-bold text-gray-900">
                  NEXGEN 9 IT SOLUTIONS
                </h4>
                <p className="text-xs text-gray-500">
                  Future-Ready Digital Systems
                </p>
              </div>

              <ul className="flex flex-col gap-6 text-center">
                {sections.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setOpen(false)}
                    className="text-lg fw-medium text-gray-800"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-8 block text-center 
                           px-6 py-3 rounded-full 
                           text-white fw-semibold
                           bg-gradient-to-r from-horizon-orange to-horizon-amber"
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
