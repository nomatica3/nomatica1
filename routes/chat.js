const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// POST /api/chat/:model
router.post('/api/chat/:model', async (req, res) => {
  const model = req.params.model.toLowerCase();
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Missing prompt." });

  if (model === 'gpt-3.5-turbo') {
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      });
      return res.json({ reply: response.data.choices[0].message.content });
    } catch (err) {
      console.error("OpenAI Error:", err);
      return res.status(500).json({ error: "OpenAI error" });
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
  if (!port) return res.status(400).json({ error: "Unknown model." });

  try {
    const response = await fetch(`http://127.0.0.1:${port}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return res.json({ reply: data.reply || 'No response.' });
  } catch (err) {
    console.error(`Error connecting to ${model} model:`, err);
    return res.status(500).json({ error: `Failed to connect to ${model}` });
  }
});

module.exports = router;