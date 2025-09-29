const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "polyglot",
    modelRoute: "polyglot",
    title: "Chat with Polyglot",
  });
});

module.exports = router;