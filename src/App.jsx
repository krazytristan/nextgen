import { useState } from "react";
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

  return (
    <div className="overflow-x-hidden min-h-screen bg-black text-white selection:bg-horizon-amber selection:text-black">
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
