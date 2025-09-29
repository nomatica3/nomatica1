const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "rwkv",
    modelRoute: "rwkv",
    title: "Chat with RWKV"
  });
});

module.exports = router;