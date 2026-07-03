import express from "express";
import Contact from "../models/contact.model.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstname, lastname, email, number, message } = req.body;

  if (!firstname || !lastname || !email || !number || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      number,
      message,
      ipAddress: req.ip, 
      userAgent: req.headers["user-agent"] 
    });

    const saved = await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Message saved successfully!",
      data: saved
    });
  } catch (err) {
    console.error("❌ Failed to save contact message:", err);
    return res.status(500).json({ error: "Server error. Failed to save message." });
  }
});

export default router;
