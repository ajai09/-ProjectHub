import { useState } from "react";

const services = {
  web: [
    { icon: "🖥️", title: "Web Development", badge: "Core", desc: "Responsive, accessible sites with clean, maintainable code.", tags: ["HTML", "CSS", "JS"] },
    { icon: "⚛️", title: "SPA Development", badge: "Pro", desc: "Building reactive UIs with modern frameworks and tooling.", tags: ["React", "Routing", "State"] },
    { icon: "🔐", title: "Best Practices", badge: "QA", desc: "Testing, code review, and healthy CI to ensure quality.", tags: ["Testing", "CI", "Git"] },
    {
      icon: "📡",
      title: "IoT Projects",
      badge: "Specialized",
      desc: "Designing and building reliable IoT solutions using Arduino, Raspberry Pi, sensors, and automation workflows for smart, connected systems.",
      tags: ["Arduino", "IoT", "Sensors", "Embedded Systems"]
    },
    {
      icon: "🤖",
      title: "Android Application",
      badge: "Mobile",
      desc: "Develop modern, responsive Android applications using Android Studio with clean UI, performance optimization, and user-friendly experience.",
      tags: ["Android", "Kotlin", "Java", "Mobile App"]
    },
    {
      icon: "🍎",
      title: "iOS Application",
      badge: "Mobile",
      desc: "Build high-quality iOS applications using Swift and Xcode with smooth performance, elegant design, and optimized user experience.",
      tags: ["iOS", "Swift", "Xcode", "Mobile App"]
    }
  ],
  design: [
    { icon: "🎨", title: "UI Implementation", badge: "Pixel-perfect", desc: "Translating Figma into live, responsive, and accessible UI.", tags: ["Figma", "Grid", "Animation"] },
    { icon: "🧭", title: "UX Enhancements", badge: "CX", desc: "Micro-interactions and flows that guide users to success.", tags: ["Motion", "IA", "A11y"] },
    { icon: "🧩", title: "Design Systems", badge: "Scale", desc: "Reusable components and tokens for consistency and speed.", tags: ["Components", "Tokens", "Docs"] }
  ],
  perf: [
    { icon: "⚙️", title: "Performance Audit", badge: "LCP", desc: "Diagnose bottlenecks and deliver a prioritized action plan.", tags: ["Lighthouse", "CWV", "Bundle"] },
    { icon: "⚡", title: "Optimization", badge: "Speed", desc: "Code-splitting, lazy loading, and asset optimization.", tags: ["Code Split", "Lazy", "Cache"] },
    { icon: "🔍", title: "Accessibility", badge: "WCAG", desc: "Inclusive experiences that meet accessibility standards.", tags: ["ARIA", "Contrast", "Keyboard"] }
  ],
  consult: [
    { icon: "🧠", title: "Front-end Consulting", badge: "Advisor", desc: "Roadmapping, tech choices, and delivery guidance.", tags: ["Planning", "Roadmap", "Review"] },
    { icon: "🤝", title: "Team Enablement", badge: "Mentor", desc: "Mentoring and pairing to level-up delivery and practices.", tags: ["Mentor", "Standards", "Toolkit"] },
    { icon: "📈", title: "SEO Foundations", badge: "Growth", desc: "Technical SEO to help users and crawlers find your content.", tags: ["Meta", "Sitemap", "Structured Data"] }
  ]
};

function ServicesPage() {
  const [active, setActive] = useState("web");

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Services</h1>
          <p>What I can do for your product and business.</p>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="skills-tabs" role="tablist" aria-label="Service categories">
            <button className={`tab-button ${active === "web" ? "active" : ""}`} role="tab" aria-selected={active === "web"} onClick={() => setActive("web")}>
              Web
            </button>
            <button className={`tab-button ${active === "design" ? "active" : ""}`} role="tab" aria-selected={active === "design"} onClick={() => setActive("design")}>
              Design
            </button>
            <button className={`tab-button ${active === "perf" ? "active" : ""}`} role="tab" aria-selected={active === "perf"} onClick={() => setActive("perf")}>
              Performance
            </button>
            <button className={`tab-button ${active === "consult" ? "active" : ""}`} role="tab" aria-selected={active === "consult"} onClick={() => setActive("consult")}>
              Consulting
            </button>
          </div>

          {Object.entries(services).map(([panel, cards]) => (
            <div key={panel} className={`tab-panel ${active === panel ? "show" : ""}`} hidden={active !== panel}>
              <div className="service-grid rich">
                {cards.map((card) => (
                  <div key={card.title} className="service-card">
                    <div className="service-icon">{card.icon}</div>
                    <div className="skill-head">
                      <h3>{card.title}</h3>
                      <span className="badge">{card.badge}</span>
                    </div>
                    <p>{card.desc}</p>
                    <ul className="tags">
                      {card.tags.map((tag) => (
                        <li key={`${card.title}-${tag}`}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
