const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Cerebras",
    modelRoute: "cerebras",
    title: "Chat with Cerebras"
  });
});

module.exports = router;