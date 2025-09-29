const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model27",
    modelRoute: "model27",
    title: "Chat with Model27",
  });
});

module.exports = router;