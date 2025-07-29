const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POST /chat
router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Call OpenAI Chat Completion
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage }
      ]
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;