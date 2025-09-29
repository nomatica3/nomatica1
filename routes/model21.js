const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model21",
    modelRoute: "model21",
    title: "Chat with Model21",
  });
});

module.exports = router;