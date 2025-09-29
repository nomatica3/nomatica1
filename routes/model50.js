const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model50",
    modelRoute: "model50",
    title: "Chat with Model50",
  });
});

module.exports = router;