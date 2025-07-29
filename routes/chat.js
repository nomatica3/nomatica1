const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');

router.post('/chat/:model', async (req, res) => {
  const model = req.params.model.toLowerCase();
  const { prompt } = req.body;

  if (model === 'gpt-3.5-turbo') {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500
        })
      });
      const data = await response.json();
      return res.json({ reply: data.choices[0].message.content });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ reply: "Sorry, something went wrong." });
    }
  }

  const modelPortMap = {
    gemma: 5001,
    llama: 5002,
    mistral: 5003,
    openchat: 5004,
    phi4: 5005
  };
  const port = modelPortMap[model];
  if (!port) {
    return res.status(400).json({ error: 'Invalid model specified' });
  }
  try {
    const response = await fetch(`http://127.0.0.1:${port}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    res.json({ reply: data.reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

// GPT-3.5 Turbo chat Main Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});
  app.listen(5000, () => {
    console.log(`Server running on port 5000`);
  });

// 👇 Secure route to Gemma (running on localhost:5001)
router.post('/gemma', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5001', {
      prompt: req.body.prompt
    });
    res.json({ reply: response.data });
  } catch (err) {
    console.error('Gemma error:', err.message);
    res.status(500).send('Gemma model unavailable');
  }
});

// 👇 Secure route to LLaMA (running on localhost:5002)
router.post('/llama', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5002', {
      prompt: req.body.prompt
    });
    res.json({ reply: response.data });
  } catch (err) {
    console.error('LLaMA error:', err.message);
    res.status(500).send('LLaMA model unavailable');
  }
});

// 👇 Secure route to Mistral (localhost:5003)
router.post('/mistral', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5003', {
      prompt: req.body.prompt
    });
    res.json({ reply: response.data });
  } catch (err) {
    console.error('Mistral error:', err.message);
    res.status(500).send('Mistral model unavailable');
  }
});

// 👇 Secure route to OpenChat (localhost:5004)
router.post('/openchat', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5004', {
      prompt: req.body.prompt
    });
    res.json({ reply: response.data });
  } catch (err) {
    console.error('OpenChat error:', err.message);
    res.status(500).send('OpenChat model unavailable');
  }
});

// 👇 Secure route to Phi-4 (localhost:5005)
router.post('/phi4', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5005', {
      prompt: req.body.prompt
    });
    res.json({ reply: response.data });
  } catch (err) {
    console.error('Phi-4 error:', err.message);
    res.status(500).send('Phi-4 model unavailable');
  }
});

module.exports = router;