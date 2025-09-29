const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "gptj",
    modelRoute: "gptj",
    title: "Chat with GPT-J",
  });
});

module.exports = router;