import { useState } from "react";
import CounterMetric from "../components/CounterMetric";

const skillPanels = {
  frontend: [
    { title: "HTML5", badge: "Expert", desc: "Semantic, accessible markup and SEO-friendly structure.", tags: ["ARIA", "SEO", "Semantics"], progress: 95 },
    { title: "CSS3", badge: "Advanced", desc: "Responsive layouts with Grid/Flexbox and modern theming.", tags: ["Grid", "Flexbox", "Animations"], progress: 90 },
    { title: "JavaScript", badge: "Advanced", desc: "Modern ES features, modular code, and performance.", tags: ["ES6+", "Modules", "Performance"], progress: 85 },
    { title: "React", badge: "Proficient", desc: "Component-driven UIs with hooks and state management.", tags: ["Hooks", "SPA", "State"], progress: 80 },
    { title: "Swift", badge: "Proficient", desc: "Building clean and scalable iOS-focused application logic with modern Swift features.", tags: ["iOS", "OOP", "App Architecture"], progress: 74 }
  ],
  tools: [
    { title: "Git & GitHub", badge: "Advanced", desc: "Feature branches, PR reviews, and clean commit history.", tags: ["PRs", "Rebase", "Code Review"], progress: 88 },
    { title: "Webpack/Vite", badge: "Proficient", desc: "Fast dev builds and optimized production bundles.", tags: ["HMR", "Code Split", "Minify"], progress: 82 },
    { title: "Testing", badge: "Proficient", desc: "Unit and integration tests for critical flows.", tags: ["Jest", "RTL", "MSW"], progress: 75 },
    {
      title: "Android Studio",
      badge: "Proficient",
      desc: "Developing, debugging, and profiling Android applications with efficient build workflows.",
      tags: ["Android", "Gradle", "Debugging"],
      progress: 78
    },
    { title: "Xcode", badge: "Proficient", desc: "Creating and testing iOS projects with simulator workflows, signing, and release preparation.", tags: ["iOS", "Simulator", "Build & Deploy"], progress: 76 }
  ],
  soft: [
    { title: "Communication", badge: "Strong", desc: "Clear, concise updates and collaborative approach.", tags: ["Docs", "Stakeholders", "Teamwork"], progress: 90 },
    { title: "Problem Solving", badge: "Strong", desc: "Breaking down complexity and delivering pragmatic solutions.", tags: ["Analysis", "Debugging", "Ownership"], progress: 92 },
    { title: "Leadership", badge: "Growing", desc: "Mentoring and driving initiatives to completion.", tags: ["Mentorship", "Planning", "Quality"], progress: 78 }
  ]
};

function SkillsPage() {
  const [active, setActive] = useState("frontend");

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Skills</h1>
          <p>Tools and technologies I use to craft web experiences.</p>
        </div>
      </section>

      <section className="skills-content">
        <div className="container">
          <div className="skills-tabs" role="tablist" aria-label="Skill categories">
            <button className={`tab-button ${active === "frontend" ? "active" : ""}`} role="tab" aria-selected={active === "frontend"} onClick={() => setActive("frontend")}>
              Front-end
            </button>
            <button className={`tab-button ${active === "tools" ? "active" : ""}`} role="tab" aria-selected={active === "tools"} onClick={() => setActive("tools")}>
              Tools
            </button>
            <button className={`tab-button ${active === "soft" ? "active" : ""}`} role="tab" aria-selected={active === "soft"} onClick={() => setActive("soft")}>
              Soft skills
            </button>
          </div>

          {Object.entries(skillPanels).map(([panel, items]) => (
            <div key={panel} className={`tab-panel ${active === panel ? "show" : ""}`} hidden={active !== panel}>
              <div className="skills-grid rich">
                {items.map((item) => (
                  <div key={item.title} className="skill-card rich-card">
                    <div className="skill-head">
                      <h3>{item.title}</h3>
                      <span className="badge">{item.badge}</span>
                    </div>
                    <p className="skill-desc">{item.desc}</p>
                    <ul className="tags">
                      {item.tags.map((tag) => (
                        <li key={`${item.title}-${tag}`}>{tag}</li>
                      ))}
                    </ul>
                    <div className="progress" data-progress={item.progress}>
                      <span style={{ width: `${active === panel ? item.progress : 0}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="skill-metrics">
            <CounterMetric target={5} label="Years Experience" />
            <CounterMetric target={40} label="Projects" />
            <CounterMetric target={20} label="Happy Clients" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SkillsPage;
