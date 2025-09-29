const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "rex",
    modelRoute: "rex",
    title: "Chat with Rex"
  });
});

module.exports = router;