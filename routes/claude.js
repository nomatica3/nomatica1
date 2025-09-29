const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Claude",
    modelRoute: "claude",
    title: "Chat with Claude"
  });
});

module.exports = router;