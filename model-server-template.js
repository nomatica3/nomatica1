const express = require('express');

const port = process.argv[2] || 5001;
const name = process.argv[3] || 'Model';
const subdomain = process.argv[4] || '';

const app = express();
app.use(express.json());

app.post('/broadcast', (req, res) => {
  const { update } = req.body;
  if (!update) return res.status(400).json({ error: 'No update provided' });

  console.log(`[${name}] (${subdomain}) Broadcasting: ${update}`);
  res.json({ success: true, message: `${name} broadcasted update.` });
});

app.listen(port, () => {
  console.log(`✅ ${name} running on port ${port} (${subdomain})`);
});