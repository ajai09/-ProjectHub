import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    const supportsReveal = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsReveal) return;

    const selectors = [
      ".hero-text",
      ".hero-media",
      ".feature-card",
      ".page-hero .container",
      ".about-media",
      ".about-text",
      ".skill-card",
      ".service-card",
      ".metric",
      ".info-card",
      ".contact-form",
      ".faq"
    ];

    const revealItems = document.querySelectorAll(selectors.join(","));
    revealItems.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(index * 45, 450)}ms`;
    });

    document.querySelectorAll(".hero-text, .about-text, .contact-form").forEach((el) => {
      el.setAttribute("data-reveal", "left");
    });
    document.querySelectorAll(".hero-media, .about-media").forEach((el) => {
      el.setAttribute("data-reveal", "right");
    });
    document.querySelectorAll(".feature-card, .skill-card, .service-card, .metric, .info-card, .faq").forEach((el) => {
      el.setAttribute("data-reveal", "zoom");
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
