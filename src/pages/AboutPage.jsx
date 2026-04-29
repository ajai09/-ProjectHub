import { Link } from "react-router-dom";
import CounterMetric from "../components/CounterMetric";
import profileImage from "../image/pic.png";

function AboutPage() {
  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>About Me</h1>
          <p>Passionate about crafting beautiful, user-centric mobile apps.</p>
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
            <h2>I'm Aloysius Ajai L., a Mobile App Developer and Freelancer</h2>
            <p>
              I am a passionate Mobile App Developer and Freelancer with a strong interest in creating innovative and user-friendly applications. I specialize in building modern mobile apps using the latest technologies and best practices.
            </p>
            <p>
              I enjoy solving real-world problems through code and continuously improving my skills to stay updated with industry trends. As a freelancer, I have worked on various projects, delivering efficient and scalable solutions to clients.
            </p>
            <p>
              My goal is to create impactful digital products that provide seamless user experiences and add real value.
            </p>
            <ul className="about-highlights">
              <li>Modern stacks: HTML, CSS, JavaScript,React,Swift</li>
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
