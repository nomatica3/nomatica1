const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "ultralm",
    modelRoute: "ultralm",
    title: "Chat with Ultralm",
  });
});

module.exports = router;