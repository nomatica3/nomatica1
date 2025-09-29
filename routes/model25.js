const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model25",
    modelRoute: "model25",
    title: "Chat with Model 25",
  });
});

module.exports = router;