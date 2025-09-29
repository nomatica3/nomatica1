const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "codellama",
    modelRoute: "codellama",
    title: "Chat with Code Llama",
  });
});

module.exports = router;