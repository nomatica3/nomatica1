const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Claude 2",
    modelRoute: "claude2",
    title: "Chat with Claude 2"
  });
});

module.exports = router;
