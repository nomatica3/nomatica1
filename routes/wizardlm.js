const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "wizardlm",
    modelRoute: "wizardlm",
    title: "Chat with WizardLM",
  });
});

module.exports = router;