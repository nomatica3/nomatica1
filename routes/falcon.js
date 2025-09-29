const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "falcon",
    modelRoute: "falcon",
    title: "Chat with Falcon"
  });
});

module.exports = router;