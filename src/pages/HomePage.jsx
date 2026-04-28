import { Link } from "react-router-dom";
import heroImage from "../image/pic.png";

function HomePage() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow">Hello, I'm</p>
            <h1>Aloysius Ajai L.</h1>
            <h2 className="profession">Front-End Developer</h2>
            <p className="subtitle">I design and build modern, fast, and accessible web experiences.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Hire Me
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
            <ul className="hero-badges">
              <li>Responsive</li>
              <li>Accessible</li>
              <li>Performance-first</li>
            </ul>
            <div className="social-links">
              <a href="#" aria-label="GitHub">
                🐙
              </a>
              <a href="#" aria-label="LinkedIn">
                🔗
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-image-frame">
              <img src={heroImage} alt="Aloysius Ajai L." />
              <span className="hero-chip hero-chip-top" aria-label="React">
                <span className="react-logo" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>
              <span className="hero-chip hero-chip-bottom" aria-label="GitHub">
                <svg className="github-logo" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.93c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
                </svg>
              </span>
              <span className="hero-chip hero-chip-android" aria-label="Android Studio">
                <svg className="tool-logo android-logo" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.2 9.4h9.6a1 1 0 0 1 1 1v6.7a4.8 4.8 0 0 1-4.8 4.8h-2a4.8 4.8 0 0 1-4.8-4.8v-6.7a1 1 0 0 1 1-1Z" />
                  <path d="M8.1 7.9 6.4 5.3M15.9 7.9l1.7-2.6" />
                  <path d="M8.5 13.1h.1M15.4 13.1h.1" />
                  <path d="M5.1 11.1v5.7M18.9 11.1v5.7" />
                </svg>
              </span>
              <span className="hero-chip hero-chip-xcode" aria-label="Xcode">
                <svg className="tool-logo xcode-logo" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.2 3.7 4.4 18.9a1.3 1.3 0 0 0 1.1 2h13a1.3 1.3 0 0 0 1.1-2L10.8 3.7a1.4 1.4 0 0 0-2.4 0" />
                  <path d="M8.8 16.9 15.5 5.4M12.1 11.2l3.5 6.1" />
                </svg>
              </span>
              <span className="hero-chip hero-chip-vscode" aria-label="VS Code">
                <svg className="tool-logo vscode-logo" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.2 3.8 9.7 11.2 5.4 7.9 3.2 9.2v5.6l2.2 1.3 4.3-3.3 8.5 7.4 2.6-1.1V4.9l-2.6-1.1Z" />
                  <path d="M18.2 8.1 12.5 12l5.7 3.9V8.1Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured" aria-label="Highlights">
        <div className="container features">
          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Performance</h3>
            <p>Optimized, responsive interfaces focused on speed and usability.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Design</h3>
            <p>Clean, modern aesthetics aligned with your brand and audience.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Quality</h3>
            <p>Accessible, maintainable code with best practices and testing.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🤝</div>
            <h3>Collaboration</h3>
            <p>Clear communication and iterative delivery to meet goals.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
