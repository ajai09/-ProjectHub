import { useState } from "react";

const initialErrors = { name: "", email: "", message: "" };
const API_URL = "https://projecthub-t02p.onrender.com/contact";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState(initialErrors);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = { ...initialErrors };

    // Validation
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!isValidEmail(form.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!form.message.trim())
      nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    setSuccess("");

    if (Object.values(nextErrors).some(Boolean)) return;

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccess("Message sent successfully ✅");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess(result.message || "Failed to send ❌");
      }
    } catch (error) {
      console.error(error);
      setSuccess("Server is not running. Start it with npm run server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="page-hero small">
        <div className="container">
          <h1>Contact</h1>
          <p>Have a project in mind? Let's talk.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-grid">
          {/* LEFT SIDE */}
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p>Fill out the form and I will get back to you within 24-48 hours.</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="service-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:ajaialoysius04@gmail.com">ajaialoysius04@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="service-icon">📱</div>
                <div>
                  <h3>Social</h3>
                  <div className="contact-social-links">
                    <a href="#" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.94 8.86H3.78v10.1h3.16V8.86ZM5.36 4a1.83 1.83 0 1 0 0 3.66 1.83 1.83 0 0 0 0-3.66Zm13.86 9.48c0-3.05-1.63-4.47-3.8-4.47a3.27 3.27 0 0 0-2.96 1.63h-.04V8.86H9.4v10.1h3.16v-5c0-1.32.25-2.6 1.88-2.6 1.61 0 1.63 1.5 1.63 2.68v4.92h3.16v-5.48Z" />
                      </svg>
                    </a>
                    <a href="https://github.com/ajai09" target="_blank" rel="noreferrer" aria-label="GitHub">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.93c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="service-icon">📍</div>
                <div>
                  <h3>Location</h3>
                  <p>Remote · Open to relocate</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* NAME */}
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <small className="error">{errors.name}</small>
            </div>

            {/* EMAIL */}
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <small className="error">{errors.email}</small>
            </div>

            {/* MESSAGE */}
            <div className="form-field">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="How can I help?"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
              <small className="error">{errors.message}</small>
            </div>

            {/* BUTTON */}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* SUCCESS MESSAGE */}
            <p className="form-success">{success}</p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
