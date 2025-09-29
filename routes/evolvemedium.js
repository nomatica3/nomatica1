const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat-model", {
    modelName: "evolvemedium",
    modelRoute: "evolvemedium",
    title: "Chat with Evolve Medium"
  });
});

module.exports = router;