const express = require("express");
const router = express.Router();

// Homepage
router.get("/", (req, res) => {
  res.render("index", { title: "Custom AI Automations" });
});

// About page (example, adjust as needed)
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

module.exports = router;