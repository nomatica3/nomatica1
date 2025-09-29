const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "futuremodel1",
    modelRoute: "futuremodel1",
    title: "Chat with Future Model 1",
  });
});

module.exports = router;