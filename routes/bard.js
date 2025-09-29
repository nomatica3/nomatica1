const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Bard",
    modelRoute: "bard",
    title: "Chat with Bard"
  });
});

module.exports = router;