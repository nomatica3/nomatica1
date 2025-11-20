require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const vhost = require("vhost");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const expressLayouts = require("express-ejs-layouts");

// Routes
const mainRoutes = require("./routes/index");
const exploreModelRoutes = require("./routes/explore");
const chatRoutes = require("./routes/chat");
const gemmaRoutes = require("./routes/gemma");
const llama2Routes = require("./routes/llama2");
const mistralRoutes = require("./routes/mistral");
const phi4Routes = require("./routes/phi4");
const gpt35Routes = require("./routes/gpt35");
const openchatRoutes = require("./routes/openchat");
const geminiRoutes = require("./routes/gemini");
const bardRoutes = require("./routes/bard");
const claudeRoutes = require("./routes/claude");
const deepseekRoutes = require("./routes/deepseek");
const grokRoutes = require("./routes/grok");
const gpt4Routes = require("./routes/gpt4");
const claude2Routes = require("./routes/claude2");
const mistral2Routes = require("./routes/mistral2");
const cerebrasRoutes = require("./routes/cerebras");
const starcoderRoutes = require("./routes/starcoder");

// Models configuration with source and proxy ports
const models = [
  { route: "gemma", name: "Gemma 7B", sourcePort: 5001, proxyPort: 6001, subdomain: "gemma.colorfulmoves.com" },
  { route: "llama2", name: "LLaMA 2 13B", sourcePort: 5002, proxyPort: 6002, subdomain: "llama2.colorfulmoves.com" },
  { route: "mistral", name: "Mistral 7B", sourcePort: 5003, proxyPort: 6003, subdomain: "mistral.colorfulmoves.com" },
  { route: "phi4", name: "Phi-4", sourcePort: 5004, proxyPort: 6004, subdomain: "phi4.colorfulmoves.com" },
  { route: "gpt35", name: "GPT-3.5 Turbo", sourcePort: 5005, proxyPort: 6005, subdomain: "gpt35.colorfulmoves.com" },
  { route: "openchat", name: "OpenChat", sourcePort: 5006, proxyPort: 6006, subdomain: "openchat.colorfulmoves.com" },
  { route: "gemini", name: "Gemini", sourcePort: 5007, proxyPort: 6007, subdomain: "gemini.colorfulmoves.com" },
  { route: "bard", name: "Bard", sourcePort: 5008, proxyPort: 6008, subdomain: "bard.colorfulmoves.com" },
  { route: "claude", name: "Claude", sourcePort: 5009, proxyPort: 6009, subdomain: "claude.colorfulmoves.com" },
  { route: "deepseek", name: "DeepSeek", sourcePort: 5010, proxyPort: 6010, subdomain: "deepseek.colorfulmoves.com" },
  { route: "grok", name: "Grok", sourcePort: 5011, proxyPort: 6011, subdomain: "grok.colorfulmoves.com" },
  { route: "gpt4", name: "GPT-4", sourcePort: 5012, proxyPort: 6012, subdomain: "gpt4.colorfulmoves.com" },
  { route: "claude2", name: "Claude 2", sourcePort: 5013, proxyPort: 6013, subdomain: "claude2.colorfulmoves.com" },
  { route: "mistral2", name: "Mistral 2", sourcePort: 5016, proxyPort: 6016, subdomain: "mistral2.colorfulmoves.com" },
  { route: "cerebras", name: "Cerebras", sourcePort: 5021, proxyPort: 6021, subdomain: "cerebras.colorfulmoves.com" },
  { route: "starcoder", name: "StarCoder", sourcePort: 5022, proxyPort: 6022, subdomain: "starcoder.colorfulmoves.com" },
];

// Map of model routes
const routesMap = {
  gemma: gemmaRoutes,
  llama2: llama2Routes,
  mistral: mistralRoutes,
  phi4: phi4Routes,
  gpt35: gpt35Routes,
  openchat: openchatRoutes,
  gemini: geminiRoutes,
  bard: bardRoutes,
  claude: claudeRoutes,
  deepseek: deepseekRoutes,
  grok: grokRoutes,
  gpt4: gpt4Routes,
  claude2: claude2Routes,
  mistral2: mistral2Routes,
  cerebras: cerebrasRoutes,
  starcoder: starcoderRoutes,
};

// Create proxy servers for each model (dedicated ports in 6000 range)
const servers = models.map((model) => {
  const app = express();

  // Middleware for individual proxy server
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLayouts);

  // View engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  // Proxy middleware for specific model
  app.use(
    "/",
    createProxyMiddleware({
      target: `http://localhost:${model.sourcePort}`,
      changeOrigin: true,
    })
  );

  // Error handling
  app.use((err, req, res, next) => {
    console.error(`Error in ${model.name} proxy:`, err.stack);
    res.status(500).render("500", { title: "Server Error" });
  });

  return { app, model };
});

// Main application
const mainApp = express();

// Main app middleware
mainApp.use(express.static(path.join(__dirname, "public")));
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));
mainApp.use(expressLayouts);

// View engine for main app
mainApp.set("view engine", "ejs");
mainApp.set("views", path.join(__dirname, "views"));

// Normal routes
mainApp.use("/", mainRoutes);
mainApp.use("/explore", exploreModelRoutes);
mainApp.use("/chat", chatRoutes);

// Model-specific proxy routes on main app (e.g., /gemma proxies to model's source port)
models.forEach((model) => {
  mainApp.use(
    `/${model.route}`,
    createProxyMiddleware({
      target: `http://localhost:${model.sourcePort}`,
      changeOrigin: true,
      pathRewrite: { [`^/${model.route}`]: "" },
    })
  );
});

// Subdomain routing for each model using dedicated routes
models.forEach((model) => {
  mainApp.use(vhost(model.subdomain, routesMap[model.route]));
});

// Admin broadcast route (broadcasts to all models)
mainApp.post("/admin/update", async (req, res) => {
  const update = req.body.update;
  if (!update) return res.status(400).json({ error: "No update provided" });

  try {
    for (const model of models) {
      await fetch(`http://localhost:${model.sourcePort}/broadcast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ update }),
      });
    }
    res.json({ success: true, message: "Broadcast successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Broadcast failed" });
  }
});

// Catch-all routes for main app
mainApp.use((req, res) => res.status(404).render("404", { title: "Not Found" }));
mainApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Server Error" });
});

// Start main server
const MAIN_PORT = process.env.PORT || 5000;
mainApp.listen(MAIN_PORT, () => {
  console.log(`Main server running on port ${MAIN_PORT}`);
  console.log("Available subdomain routes:");
  models.forEach((m) => console.log(` - ${m.subdomain}`));
  console.log("Available model proxy routes on main server:");
  models.forEach((m) => console.log(` - http://localhost:${MAIN_PORT}/${m.route}`));
});

// Start proxy servers
servers.forEach(({ app, model }) => {
  app.listen(model.proxyPort, () => {
    console.log(`Proxy for ${model.name} running on port ${model.proxyPort}`);
    console.log(`Forwarding to http://localhost:${model.sourcePort}`);
  });
});
