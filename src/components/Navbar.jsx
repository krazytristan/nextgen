import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ loaded = true }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();

  /* ================= SCROLL LISTENER ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y > lastScrollY.current + 12 && y > 150) {
        setHidden(true);
      } else if (y < lastScrollY.current - 12) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= ACTIVE SECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== NAVBAR HEADER ===== */}
      <motion.header
        initial={reduceMotion ? false : { y: -90, opacity: 0 }}
        animate={
          loaded
            ? { y: hidden ? -90 : 0, opacity: 1 }
            : { y: -90, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed top-2.5 sm:top-5 inset-x-0 z-50 px-3 sm:px-6"
      >
        <nav className="mx-auto max-w-7xl">
          <div
            className={`flex items-center justify-between h-16 sm:h-[72px] px-4 sm:px-7 rounded-2xl sm:rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-zinc-950/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/60"
                : "bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg"
            }`}
          >
            {/* BRAND LOGO */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-horizon-orange via-horizon-amber to-horizon-yellow flex items-center justify-center font-black text-black text-sm shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                  <span className="tracking-tighter">H9</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-horizon-orange to-horizon-amber rounded-2xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
              </div>

              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-horizon-amber transition-colors">
                    HORIZON IT
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-horizon-amber/20 text-horizon-amber border border-horizon-amber/30 uppercase tracking-wider hidden sm:inline-block">
                    Solutions
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-zinc-400">
                  Next-Gen Digital Systems
                </span>
              </div>
            </a>

            {/* DESKTOP NAVIGATION */}
            <ul className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/5">
              {sections.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id} className="relative">
                    <a
                      href={`#${id}`}
                      className={`relative z-10 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 block ${
                        isActive
                          ? "text-black font-semibold"
                          : "text-zinc-300 hover:text-white"
                      }`}
                    >
                      {label}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-md shadow-orange-500/25"
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* RIGHT ACTION */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </a>

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 hover:text-white hover:bg-white/10 transition"
                aria-label="Toggle mobile menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ===== MOBILE DRAWER / MODAL ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-24 left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 z-50 shadow-2xl shadow-black/80 lg:hidden"
            >
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-horizon-orange to-horizon-amber flex items-center justify-center font-black text-black text-xs">
                    H9
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">HORIZON IT</h4>
                    <p className="text-[10px] text-zinc-400">Next-Gen Digital Systems</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {sections.map(({ id, label }) => {
                  const isActive = active === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-horizon-amber font-semibold"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{label}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? "text-horizon-amber" : "text-zinc-600"}`} />
                    </a>
                  );
                })}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-black text-sm bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-lg shadow-orange-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
