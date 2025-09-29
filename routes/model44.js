const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model44",
    modelRoute: "model44",
    title: "Chat with Model44",
  });
});

module.exports = router;