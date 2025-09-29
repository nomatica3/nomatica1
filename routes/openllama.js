const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "openllama",
    modelRoute: "openllama",
    title: "Chat with OpenLLaMA",
  });
});

module.exports = router;