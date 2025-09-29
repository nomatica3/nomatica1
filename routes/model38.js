const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model38",
    modelRoute: "model38",
    title: "Chat with Model38",
  });
});

module.exports = router;