const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "instructgpt",
    modelRoute: "instructgpt",
    title: "Chat with Instruct GPT"
  });
});

module.exports = router;