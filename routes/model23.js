const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model23",
    modelRoute: "model23",
    title: "Chat with Model23",
  });
});

module.exports = router;