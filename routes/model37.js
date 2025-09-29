const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model37",
    modelRoute: "model37",
    title: "Chat with Model37",
  });
});

module.exports = router;