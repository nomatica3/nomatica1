const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Gemma 7B",
    modelRoute: "gemma",
    title: "Chat with Gemma 7B"
  });
});

module.exports = router;