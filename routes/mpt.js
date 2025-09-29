const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "mpt",
    modelRoute: "mpt",
    title: "Chat with MPT",
  });
});

module.exports = router;