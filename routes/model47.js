const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model47",
    modelRoute: "model47",
    title: "Chat with Model47",
  });
});

module.exports = router;