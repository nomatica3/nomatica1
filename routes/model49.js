const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model49",
    modelRoute: "model49",
    title: "Chat with Model49",
  });
});

module.exports = router;