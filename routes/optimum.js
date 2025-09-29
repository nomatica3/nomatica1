const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "optimum",
    modelRoute: "optimum",
    title: "Chat with Optimum"
  });
});

module.exports = router;