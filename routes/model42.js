const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model42",
    modelRoute: "model42",
    title: "Chat with Model42",
  });
});

module.exports = router;