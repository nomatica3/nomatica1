const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model32",
    modelRoute: "model32",
    title: "Chat with Model32",
  });
});

module.exports = router;