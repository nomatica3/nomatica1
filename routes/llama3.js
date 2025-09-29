const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Llama 3",
    modelRoute: "llama3",
    title: "Chat with Llama 3"
  });
});

module.exports = router;