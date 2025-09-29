const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "replit",
    modelRoute: "replit",
    title: "Chat with Replit",
  });
});

module.exports = router;