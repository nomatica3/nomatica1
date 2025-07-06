require('dotenv').config();
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
console.log("OPENAI_API_BASE_URL:", process.env.OPENAI_API_BASE_URL);
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Contact form
app.get('/contact', (req, res) => res.render('contact'));
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form:', { name, email, message });
  res.render('contact', { success: true, name });
});

// AI Chat page
app.get('/ai-chat', (req, res) => res.render('ai-chat'));

// Actual AI endpoint
app.post('/api/ai-chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  console.log("AI Chat Prompt:", prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    const aiResponse = completion.choices[0].message.content.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "Error contacting OpenAI." });
  }
});

// 404 fallback
app.use((req, res) => res.status(404).send("Page not found."));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("OpenAI Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 8));
});
// Export app for testing
module.exports = app; // This allows us to run tests against the server
// Note: Ensure you have a .env file with the required variables set up
// Example .env file content:
// OPENAI_API_KEY=your_openai_api_key