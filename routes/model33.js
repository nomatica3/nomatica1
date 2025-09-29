const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model33",
    modelRoute: "model33",
    title: "Chat with Model33",
  });
});

module.exports = router;