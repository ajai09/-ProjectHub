import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import Contact from "./models/Contact.js";
import nodemailer from "nodemailer";
import validator from "validator";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
  quiet: true
});

const app = express();
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

// =============================
// 🔥 EMAIL SETUP (FIXED)
// =============================
let transporter = null;

const initTransporter = () => {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("Email not configured ❌");
    return null;
  }

  const t = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  // Verify connection
  t.verify((err, success) => {
    if (err) {
      console.log("❌ Email error:", err.message);
    } else {
      console.log("✅ Email server ready");
    }
  });

  return t;
};

transporter = initTransporter();

// =============================
// Middleware
// =============================
app.use(cors());
app.use(express.json());

// =============================
// Test route
// =============================
app.get("/", (req, res) => {
  res.send("Server Working 🚀");
});

// =============================
// 📩 CONTACT FORM API
// =============================
app.post("/contact", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const { name, email, message, phone } = req.body;

    // ✅ Validation
    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required"
      });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    // ✅ Save to MongoDB
    const contact = new Contact({ name, email, message, phone });
    await contact.save();

    // =============================
    // 📩 SEND EMAIL
    // =============================
    if (transporter && email) {
      try {
        // 👉 User email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thanks for contacting 🙌",
          text: `Hi ${name},

Thanks for reaching out! I received your message and will get back to you soon.

- Ajai`
        });

        // 👉 Admin email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: "New Contact Message 🚀",
          text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}
          `
        });

        console.log("✅ Emails sent");

      } catch (emailErr) {
        console.log("❌ Email failed:", emailErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Message saved successfully ✅"
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({
      message: "Error saving data"
    });
  }
});

// =============================
// 📊 GET CONTACTS
// =============================
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

// =============================
// DB CONNECTION
// =============================
if (!mongoUri) {
  console.error("MongoDB URI missing ❌");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });