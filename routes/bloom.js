const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "bloom",
    modelRoute: "bloom",
    title: "Chat with Bloom"
  });
});

module.exports = router;