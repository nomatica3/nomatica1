const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Mistral 2",
    modelRoute: "mistral2",
    title: "Chat with Mistral 2"
  });
});

module.exports = router;