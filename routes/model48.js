const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model48",
    modelRoute: "model48",
    title: "Chat with Model48",
  });
});

module.exports = router;