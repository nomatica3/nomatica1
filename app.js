import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const openai = new OpenAI();

app.get("/", async (req, res) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Hello!" }]
  });
  res.send(completion.choices[0].message);
});

app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // For JSON POST bodies

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/find-contracts", (req, res) => res.render("find-contracts"));
app.get("/submit-proposal", (req, res) => res.render("submit-proposal"));
app.get("/local-subcontractors", (req, res) => res.render("local-subcontractors"));
app.get("/vendor-portal", (req, res) => res.render("vendor-portal"));
app.get("/admin-portal", (req, res) => res.render("admin-portal"));
app.get('/new-chat', (req, res) => res.render('new-chat'));
app.get('/search-chats', (req, res) => res.render('search-chats'));
app.get('/library', (req, res) => res.render('library'));
app.get('/images', (req, res) => res.render('images'));
app.get('/videos', (req, res) => res.render('videos'));
app.get('/explore', (req, res) => res.render('explore'));

// OpenAI API proxy route
app.post("/api/ai-chat", async (req, res) => {
  const userPrompt = req.body.prompt;
  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt required" });
  }
  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: userPrompt }],
        max_tokens: 256,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.yH7WUNmENC0de_t51MOyk50AyG-PuCLfa0msmD-gLisoHd3BzMSlfZIaIN1NEtHJy-ZoZkelnAT3BlbkFJPrnOflpMAGau2POMz-vsLWYraXPSa2pQekjs_gua-q0qSKuyzOJSVoX9ba9vho55WlHPtgkV0A}`,
          "Content-Type": "application/json",
        },
      }
    );
    const aiMessage = openaiRes.data.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
