require("dotenv").config();
const express = require("express");
const vhost = require("vhost");
const path = require("path");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const exploreRoutes = require("./routes/index");
const exploreModelRoutes = require("./routes/explore");
const app = express();
const chatRoutes = require("./routes/chat");

app.use('/', exploreRoutes);
app.use('/explore', exploreModelRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Mount core routes
const exploreRoutes = require("./routes/explore");
app.use("/chat", chatRoutes);
app.use("/explore", exploreRoutes);

// Subdomain routing (optional)
app.use(vhost('gemma.nomatica.colorfulmoves.com', require('./routes/gemma')));
app.use(vhost('llama.nomatica.colorfulmoves.com', require('./routes/llama')));
app.use(vhost('mistral.nomatica.colorfulmoves.com', require('./routes/mistral')));

// Admin update route
const models = ["gemma", "llama", "mistral", "phi4", "gpt3_5", "gpt4"];
function getPort(model) {
  return {
    gemma: 5001,
    llama: 5002,
    mistral: 5003,
    phi4: 5005,
    gpt3_5: 5006,
    gpt4: 5007
  }[model] || null;
}
app.post('/admin/update', async (req, res) => {
  const update = req.body.update;
  if (!update) return res.status(400).json({ error: 'No update provided' });

  try {
    for (const model of models) {
      const port = getPort(model);
      await fetch(`http://localhost:${port}/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ update })
      });
    }
    res.json({ success: true, message: "Broadcast successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Broadcast failed" });
  }
});

// UI Routes
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));
// etc.

// Catch-all handlers
app.use((req, res) => res.status(404).render("404", { title: "Not Found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Server Error" });
});

// ✅ Start ONE server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});