const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "vicuna",
    modelRoute: "vicuna",
    title: "Chat with Vicuna"
  });
});

module.exports = router;