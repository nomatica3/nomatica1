const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "t5",
    modelRoute: "t5",
    title: "Chat with T5"
  });
});

module.exports = router;