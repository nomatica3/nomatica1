// app.js
require('dotenv').config();
const express = require("express");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
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

// Page routes
const pages = [
  { path: "/", view: "index", title: "Home" },
  { path: "/about", view: "about", title: "About" },
  { path: "/admin-portal", view: "admin-portal", title: "Admin Portal" },
  { path: "/new-chat", view: "new-chat", title: "New Chat" },
  { path: "/find-contracts", view: "find-contracts", title: "Find Contracts" },
  { path: "/submit-proposal", view: "submit-proposal", title: "Submit Proposal" },
  { path: "/local-subcontractors", view: "local-subcontractors", title: "Local Subcontractors" },
  { path: "/vendor-portal", view: "vendor-portal", title: "Vendor Portal" },
  { path: "/library", view: "library", title: "Library" },
  { path: "/search-chats", view: "search-chats", title: "Search Chats" },
  { path: "/images", view: "images", title: "Images" },
  { path: "/videos", view: "videos", title: "Videos" },
  { path: "/explore", view: "explore", title: "Explore" },
  { path: "/settings", view: "settings", title: "Settings" },
  { path: "/help", view: "help", title: "Help" },
  { path: "/terms", view: "terms", title: "Terms of Service" },
  { path: "/privacy", view: "privacy", title: "Privacy Policy" }
];

// Automatically create routes
pages.forEach(({ path, view, title }) => {
  app.get(path, (req, res) => res.render(view, { title }));
});

// 🚀 This code will print all routes:
console.log("\n✅ Registered routes:");
app._router.stack.forEach(middleware => {
  if (middleware.route) {
    console.log(`  ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach(handler => {
      if (handler.route) {
        console.log(`  ${Object.keys(handler.route.methods).join(', ').toUpperCase()} ${handler.route.path}`);
      }
    });
  }
});

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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Declare PORT at the end
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
