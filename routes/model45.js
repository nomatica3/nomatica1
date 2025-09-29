const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model45",
    modelRoute: "model45",
    title: "Chat with Model45",
  });
});

module.exports = router;