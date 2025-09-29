const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model31",
    modelRoute: "model31",
    title: "Chat with Model31",
  });
});

module.exports = router;