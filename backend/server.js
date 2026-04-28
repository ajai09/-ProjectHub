import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import Contact from "./models/Contact.js";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
  quiet: true
});

const app = express();
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

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

    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({ message: "Message saved" });
  } catch (err) {
    console.error(err);
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
