const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Grok",
    modelRoute: "grok",
    title: "Chat with Grok"
  });
});

module.exports = router;