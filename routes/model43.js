const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model43",
    modelRoute: "model43",
    title: "Chat with Model43",
  });
});

module.exports = router;