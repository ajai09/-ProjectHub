import { Link } from "react-router-dom";
import CounterMetric from "../components/CounterMetric";
import profileImage from "../image/pic.png";

function AboutPage() {
  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>About Me</h1>
          <p>Passionate about crafting beautiful, user-centric web apps.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container about-grid">
          <div className="about-media">
            <div className="about-image-frame">
              <img src={profileImage} alt="Aloysius Ajai L. profile" />
              <span className="about-image-accent" aria-hidden="true"></span>
            </div>
          </div>
          <div className="about-text">
            <h2>I'm Aloysius Ajai L., a Front-End Developer</h2>
            <p>
              I specialize in building responsive, accessible, and performant web interfaces. With a strong eye for design and a love for clean code, I turn
              ideas into engaging digital products. I collaborate closely with teams and stakeholders to deliver outcomes that delight users and drive business
              value.
            </p>
            <ul className="about-highlights">
              <li>Modern stacks: HTML, CSS, JavaScript, React</li>
              <li>Accessibility-first and mobile-first mindset</li>
              <li>Performance optimization and best practices</li>
            </ul>
            <Link to="/contact" className="btn btn-primary">
              Work With Me
            </Link>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="skill-metrics">
            <CounterMetric target={5} label="Years Experience" />
            <CounterMetric target={40} label="Projects Delivered" />
            <CounterMetric target={20} label="Happy Clients" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
