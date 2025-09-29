const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model35",
    modelRoute: "model35",
    title: "Chat with Model35",
  });
});

module.exports = router;