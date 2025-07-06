// app.js
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = express();


// EJS view engine
app.set('layout', 'layout'); // layout.ejs in your views folder
dotenv.config(); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main routes
app.get("/", (req, res) => res.render("index"));
app.get("/find-contracts", (req, res) => res.render("find-contracts"));
app.get("/submit-proposal", (req, res) => res.render("submit-proposal"));
app.get("/local-subcontractors", (req, res) => res.render("local-subcontractors"));
app.get("/vendor-portal", (req, res) => res.render("vendor-portal"));
app.get("/admin-portal", (req, res) => res.render("admin-portal"));

app.get("/new-chat", (req, res) => res.render("new-chat"));
app.get("/search-chats", (req, res) => res.render("search-chats"));
app.get("/library", (req, res) => res.render("library"));
app.get("/images", (req, res) => res.render("images"));
app.get("/videos", (req, res) => res.render("videos"));
app.get("/explore", (req, res) => res.render("explore"));
app.get("/settings", (req, res) => res.render("settings"));
app.get("/help", (req, res) => res.render("help"));
app.get("/about", (req, res) => res.render("about"));

// AI chat endpoint
app.post("/api/ai-chat", async (req, res) => {
  const userPrompt = req.body.prompt;
  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt required" });
  }
  try {
    // Replace with your real API call to OpenAI or another model
    const aiMessage = `AI Response to: ${userPrompt}`;
    res.json({ response: aiMessage });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
