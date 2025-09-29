const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model26",
    modelRoute: "model26",
    title: "Chat with Model26",
  });
});

module.exports = router;