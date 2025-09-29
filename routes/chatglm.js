const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "chatglm",
    modelRoute: "chatglm",
    title: "Chat with Chat GLM",
  });
});

module.exports = router;