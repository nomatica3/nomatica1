const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/explore", (req, res) => {
  res.render("explore", { title: "Explore AI Models" });
});
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
}
);
router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacy Policy" });
});
router.get("/terms", (req, res) => {
  res.render("terms", { title: "Terms of Service" });
});
router.get("/help", (req, res) => {
  res.render("help", { title: "Help & Support" });
});
module.exports = router;
