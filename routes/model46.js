const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model46",
    modelRoute: "model46",
    title: "Chat with Model46",
  });
});

module.exports = router;