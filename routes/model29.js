const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model29",
    modelRoute: "model29",
    title: "Chat with Model29",
  });
});

module.exports = router;