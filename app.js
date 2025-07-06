// app.js
require('dotenv').config();
const express = require("express");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const app = express();


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main routes
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/find-contracts", (req, res) => res.render("find-contracts", { title: "Find Contracts" }));
app.get("/submit-proposal", (req, res) => res.render("submit-proposal", { title: "Submit Proposal" }));
app.get("/local-subcontractors", (req, res) => res.render("local-subcontractors", { title: "Local Subcontractors" }));
app.get("/vendor-portal", (req, res) => res.render("vendor-portal", { title: "Vendor Portal" }));
app.get("/admin-portal", (req, res) => res.render("admin-portal", { title: "Admin Portal" }));
app.get("/new-chat", (req, res) => res.render("new-chat", { title: "New Chat" }));
app.get("/search-chats", (req, res) => res.render("search-chats", { title: "Search Chats" }));
app.get("/library", (req, res) => res.render("library", { title: "Library" }));
app.get("/images", (req, res) => res.render("images", { title: "Images" }));
app.get("/videos", (req, res) => res.render("videos", { title: "Videos" }));
app.get("/explore", (req, res) => res.render("explore", { title: "Explore" }));
app.get("/settings", (req, res) => res.render("settings", { title: "Settings" }));
app.get("/help", (req, res) => res.render("help", { title: "Help" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));

// AI Chat endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.message;
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
    });
        const aiResponse = completion.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("OpenAI error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  // Simulated response
  const aiMessage = `AI Response to: ${userPrompt}`;
  res.json({ response: aiMessage });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.message;
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',  // or 'gpt-4' if you have access
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
    });

    const aiResponse = completion.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("OpenAI error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});


