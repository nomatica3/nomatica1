const express = require("express");
const app = express();
const path = require("path");

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/find-contracts", (req, res) => res.render("find-contracts"));
app.get("/submit-proposal", (req, res) => res.render("submit-proposal"));
app.get("/local-subcontractors", (req, res) => res.render("local-subcontractors"));
app.get("/vendor-portal", (req, res) => res.render("vendor-portal"));
app.get("/admin-portal", (req, res) => res.render("admin-portal"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
