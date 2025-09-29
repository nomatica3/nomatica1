const express = require("express");
const router = express.Router();

// Explore page
router.get("/", (req, res) => {
  res.render("explore", { title: "Explore AI Models" });
});

module.exports = router;