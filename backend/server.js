import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import Contact from "./models/Contact.js";
import nodemailer from "nodemailer";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
  quiet: true
});

const app = express();
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

// Transporter will be created once on startup if credentials exist
let transporter = null;
const initTransporter = () => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS not set; email sending disabled.');
    return null;
  }

  const t = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    // helpful timeouts for production
    connectionTimeout: 10_000,
    greetingTimeout: 10_000
  });

  // Verify transporter (non-blocking)
  t.verify()
    .then(() => console.log('Nodemailer transporter verified'))
    .catch((err) => console.warn('Nodemailer verify failed:', err && err.message ? err.message : err));

  return t;
};

transporter = initTransporter();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server Working");
});

// =============================
// 📩 CONTACT FORM API
// =============================
app.post("/contact", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // debug

    const { name, email, message, phone } = req.body || {};

    // Basic validation
    if (!name || !message) {
      return res.status(400).json({ message: 'Missing required fields: name and message are required' });
    }

    if (email && !validator.isEmail(String(email))) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const contact = new Contact({ name, email, message, phone });
    await contact.save();

    // If transporter not configured, skip sending but still return success
    if (!transporter) {
      console.warn('Transporter not configured; skipping email send.');
      return res.status(201).json({ message: 'Message saved (email disabled)' });
    }

    // Helper templates
    const fromAddress = `${process.env.FROM_NAME || 'Website'} <${process.env.EMAIL_USER}>`;
    const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const buildUserMail = () => ({
      from: fromAddress,
      to: email,
      subject: `Thanks for contacting us, ${name || 'there'}!`,
      text: `Hi ${name || ''},\n\nThanks for reaching out! We received your message and will get back to you shortly.\n\nBest regards,\n`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.4; color:#222;">
          <p>Hi ${name || ''},</p>
          <p>Thanks for reaching out — we received your message and will get back to you shortly.</p>
          <hr/>
          <p><strong>Your message</strong></p>
          <p>${(message && String(message).replace(/</g, '&lt;')) || '(no message provided)'}</p>
          <p>Best regards,<br/>The Team</p>
        </div>`
    });

    const buildAdminMail = () => ({
      from: fromAddress,
      to: adminRecipient,
      subject: `New contact form submission${name ? ` from ${name}` : ''}`,
      text: `New contact submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message || 'N/A'}`,
      html: `
        <div style="font-family: Arial, sans-serif; color:#222;">
          <h3>New contact form submission</h3>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${(message && String(message).replace(/</g, '&lt;')) || 'N/A'}</p>
          <hr/>
          <p>Received at ${new Date().toISOString()}</p>
        </div>`
    });

    const sendTasks = [];
    if (email) sendTasks.push(transporter.sendMail(buildUserMail()));
    sendTasks.push(transporter.sendMail(buildAdminMail()));

    // Use allSettled so one failure doesn't block the other
    const results = await Promise.allSettled(sendTasks);

    const summary = results.map((r) => ({ status: r.status, reason: r.status === 'rejected' ? (r.reason && r.reason.message ? r.reason.message : String(r.reason)) : undefined }));
    const failed = results.some(r => r.status === 'rejected');

    if (failed) {
      console.warn('One or more emails failed to send', summary);
      // Do not expose internal error details to caller in production — give a generic message
      return res.status(201).json({ message: 'Message saved; some emails failed to send', emailStatus: summary });
    }

    return res.status(201).json({ message: 'Message saved and emails sent', emailStatus: summary });
  } catch (err) {
    console.error('Contact handling error:', err && err.stack ? err.stack : err);
    res.status(500).json({ message: "Error saving data" });
  }
});

// =============================
// 📊 GET ALL CONTACTS (optional)
// =============================
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

if (!mongoUri) {
  console.error("MongoDB Error: MONGO_URI is missing in backend/.env");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });
