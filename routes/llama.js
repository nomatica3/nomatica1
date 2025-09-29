const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "LLaMA 2 13B",
    modelRoute: "llama2",
    title: "Chat with LLaMA 2 13B"
  });
});

module.exports = router;