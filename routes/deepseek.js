const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "DeepSeek",
    modelRoute: "deepseek",
    title: "Chat with DeepSeek"
  });
});