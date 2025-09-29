const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model22",
    modelRoute: "model22",
    title: "Chat with Model22",
  });
});

module.exports = router;