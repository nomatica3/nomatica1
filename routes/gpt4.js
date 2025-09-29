const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "GPT-4",
    modelRoute: "gpt4",
    title: "Chat with GPT-4"
  });
});

module.exports = router;