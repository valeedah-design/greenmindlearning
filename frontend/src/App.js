import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Home from "@/pages/Home";
import Simulations from "@/pages/Simulations";
import ConceptPreview from "@/pages/ConceptPreview";
import LearningMaterials from "@/pages/LearningMaterials";
import ResourcesHub from "@/pages/ResourcesHub";
import ForTrainers from "@/pages/ForTrainers";
import ForEnterprise from "@/pages/ForEnterprise";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import AboutContact from "@/pages/AboutContact";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/NotFound";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
        else el.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(t);
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-white">
      <BrowserRouter>
        <ScrollManager />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/simulations/preview" element={<ConceptPreview />} />
            <Route path="/learning-materials" element={<LearningMaterials />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/solutions/trainers" element={<ForTrainers />} />
            <Route path="/solutions/enterprise" element={<ForEnterprise />} />
            <Route path="/solutions/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about-contact" element={<AboutContact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
