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

// Example routes
app.get('/new-chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new-chat.html'));
});

app.get('/search-chats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search-chats.html'));
});

// Repeat for all the other pages:
app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'library.html'));
});

app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images.html'));
});

app.get('/videos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'videos.html'));
});

app.get('/explore', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

app.get('/help', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'help.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
}); 
app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});
app.get('/notifications', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notifications.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});
app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});
app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'logout.html'));
}); 