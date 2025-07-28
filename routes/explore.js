const express = require("express");
const router = express.Router();

// Route to main explore page
router.get("/", (req, res) => {
  res.render("explore", { title: "Explore AI Models" });
});

// Route per model
router.get("/gemma", (req, res) => {
  res.render("gemma", { title: "Try Gemma AI" });
});

router.get("/llama", (req, res) => {
  res.render("llama", { title: "Try Llama AI" });
}
);

router.get("/mistral", (req, res) => {
  res.render("mistral", { title: "Try Mistral AI" });
}
);

router.get("/openchat", (req, res) => { 
  res.render("openchat", { title: "Try OpenChat AI" });
}
);

router.get("/phi4", (req, res) => {
  res.render("phi4", { title: "Try Phi-4 AI" });
}
);
