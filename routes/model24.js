const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model24",
    modelRoute: "model24",
    title: "Chat with Model24",
  });
});

module.exports = router;