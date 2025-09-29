const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "model39",
    modelRoute: "model39",
    title: "Chat with Model39",
  });
});

module.exports = router;