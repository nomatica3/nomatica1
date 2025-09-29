const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "OpenChat",
    modelRoute: "openchat",
    title: "Chat with OpenChat"
  });
});

module.exports = router;
