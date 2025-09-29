const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model30",
    modelRoute: "model30",
    title: "Chat with Model30",
  });
});

module.exports = router;