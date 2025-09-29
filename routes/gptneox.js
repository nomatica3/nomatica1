const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "gptneox",
    modelRoute: "gptneox",
    title: "Chat with GPT Neox"
  });
});

module.exports = router;