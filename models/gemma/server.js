app.post('/broadcast', (req, res) => {
  const { update } = req.body;
  if (!update) return res.status(400).json({ error: 'No update message provided' });

  // Broadcast the update to all connected clients
  // (Implementation depends on your WebSocket or server-sent events setup)

  res.json({ success: true, message: 'Update broadcasted to all clients.' });
});

console.log('Gemma model is running on port 5001');