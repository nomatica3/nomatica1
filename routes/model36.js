const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model36",
    modelRoute: "model36",
    title: "Chat with Model36",
  });
});

module.exports = router;