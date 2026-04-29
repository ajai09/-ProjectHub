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
                  <p>
                    <a href="#">LinkedIn</a> · <a href="#">GitHub</a>
                  </p>
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
