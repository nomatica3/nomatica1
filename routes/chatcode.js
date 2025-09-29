const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "chatcode",
    modelRoute: "chatcode",
    title: "Chat with Chat Code"
  });
});

module.exports = router;