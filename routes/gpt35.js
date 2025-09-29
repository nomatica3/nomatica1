const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "GPT-3.5 Turbo",
    modelRoute: "gpt35",
    title: "Chat with GPT-3.5 Turbo"
  });
});

module.exports = router;