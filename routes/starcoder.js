const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "StarCoder",
    modelRoute: "starcoder",
    title: "Chat with Star Coder"
  });
});

module.exports = router;