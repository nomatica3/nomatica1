const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model34",
    modelRoute: "model34",
    title: "Chat with Model34",
  });
});

module.exports = router;