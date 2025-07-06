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

