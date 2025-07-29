app.post('/broadcast', (req, res) => {
  const { update } = req.body;
  if (!update) return res.status(400).json({ error: 'No update message provided' });

  // Broadcast the update to all connected clients
  // (Implementation depends on your WebSocket or server-sent events setup)

  res.json({ success: true, message: 'Update broadcasted to all clients.' });
});

console.log('OpenChat model is running on port 5004');
  } catch (err) {
    console.error('OpenChat error:', err.message);
    res.status(500).send('OpenChat model unavailable');
  }
});
