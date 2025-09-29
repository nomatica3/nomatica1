const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Gemini",
    modelRoute: "gemini",
    title: "Chat with Gemini"
  });
});

module.exports = router;