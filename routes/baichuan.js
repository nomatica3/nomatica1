const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "baichuan",
    modelRoute: "baichuan",
    title: "Chat with Baichuan",
  });
});

module.exports = router;