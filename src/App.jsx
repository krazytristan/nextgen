'use client';

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="overflow-x-hidden min-h-screen bg-black text-white selection:bg-horizon-amber selection:text-black">
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
    </div>
  );
}
