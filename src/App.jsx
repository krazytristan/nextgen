'use client';

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import InteractiveBackground from "./components/InteractiveBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPortal from "./components/AdminPortal";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash === "#admin" ? "admin" : "site";
    }
    return "site";
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* HASH & CUSTOM EVENT ROUTING FOR ADMIN CONSOLE */
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setCurrentView("admin");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        setCurrentView("site");
      }
    };

    const handleOpenAdmin = () => {
      window.location.hash = "admin";
      setCurrentView("admin");
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    const handleCloseAdmin = () => {
      window.location.hash = "";
      setCurrentView("site");
    };

    window.addEventListener("hashchange", handleHash);
    window.addEventListener("horizon-open-admin", handleOpenAdmin);
    window.addEventListener("horizon-close-admin", handleCloseAdmin);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("horizon-open-admin", handleOpenAdmin);
      window.removeEventListener("horizon-close-admin", handleCloseAdmin);
    };
  }, []);

  const handleBackToSite = () => {
    window.location.hash = "";
    setCurrentView("site");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-black text-white selection:bg-horizon-amber selection:text-black relative">
      {/* GLOBAL INTERACTIVE DYNAMIC BACKGROUND */}
      <InteractiveBackground />

      <AnimatePresence mode="wait">
        {currentView === "admin" ? (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="relative z-30"
          >
            <AdminPortal onBackToSite={handleBackToSite} />
          </motion.div>
        ) : (
          <motion.div
            key="site-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* GLOBAL SCROLL PROGRESS BAR (RESPONDS TO SCROLL UP & DOWN) */}
            <motion.div
              style={{ scaleX }}
              className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow origin-left z-[100] shadow-[0_0_12px_rgba(243,182,100,0.8)] pointer-events-none"
            />

            {/* High-level Cinema Opening Animation */}
            <Preloader onComplete={() => setLoaded(true)} />

            {/* Global Navigation */}
            <Navbar loaded={loaded} />

            {/* Main Content Sections */}
            <main>
              <Hero loaded={loaded} />
              <About />
              <Services />
              <Team />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
