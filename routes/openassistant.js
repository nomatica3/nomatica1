const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Open Assistant",
    modelRoute: "openassistant",
    title: "Chat with Open Assistant",
  });
});

module.exports = router;