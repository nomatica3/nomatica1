
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "Phi-4",
    modelRoute: "phi4",
    title: "Chat with Phi-4"
  });
});

module.exports = router;