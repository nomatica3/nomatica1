const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "future1",
    modelRoute: "future1",
    title: "Chat with Future1",
  });
});

module.exports = router;