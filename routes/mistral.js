const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Mistral 7B",
    modelRoute: "mistral",
    title: "Chat with Mistral 7B"
  });
});

module.exports = router;