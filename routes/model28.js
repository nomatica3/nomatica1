const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model28",
    modelRoute: "model28",
    title: "Chat with Model28",
  });
});

module.exports = router;