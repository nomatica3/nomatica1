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
