const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model40",
    modelRoute: "model40",
    title: "Chat with Model40",
  });
});

module.exports = router;