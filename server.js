// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");

// ✅ This line fixes the ReferenceError
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//const indexRoutes = require('./routes/index');
//app.use("/", indexRoutes);


// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for pages
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));
app.get("/help", (req, res) => res.render("help", { title: "Help" }));
app.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));
app.get("/privacy", (req, res) => res.render("privacy", { title: "Privacy Policy" }));
app.get("/terms", (req, res) => res.render("terms", { title: "Terms of Service" }));
app.get("/404", (req, res) => res.status(404).render("404", { title: "Page Not Found" }));
app.get("/500", (req, res) => res.status(500).render("500", { title: "Internal Server Error" })); 

// Add more .get() routes as needed

// ✅ SINGLE AI Endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.message;
    console.log("Received prompt:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    });

    console.log("OpenAI API raw response:", completion);

    const aiResponse = completion.choices[0].message.content.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to contact AI' });
  }
});




// 404 fallback
app.use((req, res) => res.status(404).send("Page not found."));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Only ONE listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("OpenAI Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 8));
});
