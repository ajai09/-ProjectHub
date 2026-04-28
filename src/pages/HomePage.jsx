import { Link } from "react-router-dom";

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
            <img src="/assets/hero-placeholder.svg" alt="Illustration" />
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
