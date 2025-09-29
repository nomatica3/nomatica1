const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model41",
    modelRoute: "model41",
    title: "Chat with Model41",
  });
});

module.exports = router;