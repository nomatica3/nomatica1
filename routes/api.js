const express = require('express');
const router = express.Router();
const { processCAPSRequest } = require('../services/capsLogic');

router.post('/caps', async (req, res) => {
  try {
    const { query } = req.body;
    const result = await processCAPSRequest(query);
    res.json({ response: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Server error.' });
  }
});

module.exports = router;
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Repeat for all the other pages, rendering EJS templates from views:
app.get('/library', (req, res) => {
  res.render('library');
});

app.get('/images', (req, res) => {
  res.render('images');
});

app.get('/videos', (req, res) => {
  res.render('videos');
});

app.get('/explore', (req, res) => {
  res.render('explore');
});

app.get('/favorites', (req, res) => {
  res.render('favorites');
});

app.get('/calendar', (req, res) => {
  res.render('calendar');
});

app.get('/find-contracts', (req, res) => {
  res.render('find-contracts');
});

app.get('/local-contractors', (req, res) => {
  res.render('local-contractors');
});

app.get('/submit-proposal', (req, res) => {
  res.render('submit-proposal');
});

app.get('/settings', (req, res) => {
  res.render('settings');
});

app.get('/help', (req, res) => {
  res.render('help');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/terms', (req, res) => {
  res.render('terms');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/feedback', (req, res) => {
  res.render('feedback');
});

app.get('/notifications', (req, res) => {
  res.render('notifications');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/account', (req, res) => {
  res.render('account');
});

app.get('/logout', (req, res) => {
  res.render('logout');
});

app.get('/new-chat', (req, res) => {
  res.render('new-chat');
});

app.get('/search-chats', (req, res) => {
  res.render('search-chats');
});

app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.message;
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

const completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: `You are a contract automation assistant for Colorful-Moves.com.
The goal is to:
1. Find contracts online,
2. Submit proposals via email,
3. Locate subcontractors within 30 miles with working contact info,
4. Calculate markup prices based on city/state averages,
5. Support a vendor portal for networking and document uploads,
6. Maintain an admin portal with performance tracking and a contract calendar,
7. Always include a human in the loop for email confirmation.`
    },
    { role: 'user', content: prompt }
  ],
  max_tokens: 800,
});

    const aiResponse = completion.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("OpenAI error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

