require("dotenv").config();
const express = require("express");
const vhost = require("vhost");
const path = require("path");
const OpenAI = require("openai");
const exploreRoutes = require("./routes/explore");
const chatRoutes = require("./routes/chat");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const app = express();

app.use("/chat", chatRoutes);
app.use("/explore", exploreRoutes);
app.use(bodyParser.json());

const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));

// Setup OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));
app.get("/help", (req, res) => res.render("help", { title: "Help" }));
app.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));
app.get("/privacy", (req, res) => res.render("privacy", { title: "Privacy Policy" }));
app.get("/terms", (req, res) => res.render("terms", { title: "Terms of Service" }));
app.get("/404", (req, res) => res.status(404).render("404", { title: "Page Not Found" }));
app.get("/500", (req, res) => res.status(500).render("500", { title: "Internal Server Error" }));
app.get("/admin-portal", (req, res) => res.render("admin-portal", { title: "Admin Portal" }));
app.get("/new-chat", (req, res) => res.render("new-chat", { title: "New Chat" }));
app.get("/find-contracts", (req, res) => res.render("find-contracts", { title: "Find Contracts" }));
app.get("/submit-proposal", (req, res) => res.render("submit-proposal", { title: "Submit Proposal" }));
app.get("/local-subcontractors", (req, res) => res.render("local-subcontractors", { title: "Local Subcontractors" }));
app.get("/vendor-portal", (req, res) => res.render("vendor-portal", { title: "Vendor Portal" }));
app.get("/library", (req, res) => res.render("library", { title: "Library" }));
app.get("/search-chats", (req, res) => res.render("search-chats", { title: "Search Chats" }));
app.get("/images", (req, res) => res.render("images", { title: "Images" }));
app.get("/videos", (req, res) => res.render("videos", { title: "Videos" }));
app.get("/explore", (req, res) => res.render("explore", { title: "Explore" }));
app.get("/settings", (req, res) => res.render("settings", { title: "Settings" }));

// AI Endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const prompt = req.body.message;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to contact AI' });
  }
});

// 404 fallback
app.use((req, res) => res.status(404).send("Page not found."));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("OpenAI Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 8));
});

// Subdomain: gemma.nomatica.colorfulmoves.com
const gemmaApp = require('./routes/gemma');
app.use(vhost('gemma.nomatica.colorfulmoves.com', gemmaApp));


// Subdomain: llama.nomatica.colorfulmoves.com
const llamApp = require ('./routes/llama');
app.use(vhost('llama.nomatica.colorfulmoves.com', llamApp));


// Subdomain: mistral.nomatica.colorfulmoves.com
const mistralApp = require('./routes/mistral');
app.use(vhost('mistral.nomatica.colorfulmoves.com', mistralApp));

// Subdomain: openchat.nomatica.colorfulmoves.com
const openchatApp = require('./routes/openchat');
app.use(vhost('openchat.nomatica.colorfulmoves.com', openchatApp));

// Subdomain: phi4.nomatica.colorfulmoves.com
const phi4App = require('./routes/phi4');
app.use(vhost('phi4.nomatica.colorfulmoves.com', phi4App));


app.listen(5000, () => {
  console.log("Main app running on port 5000");
});

app.listen(5001, () => {
  console.log("Gemma app running on port 5001");
});

app.listen(5002, () => {
  console.log("Llama app running on port 5002");
}
);
app.listen(5003, () => {
  console.log("Mistral app running on port 5003");
});

app.listen(5004, () => {
  console.log("Openchat app running on port 5004");
});

app.listen(5005, () => {
  console.log("Phi4 app running on port 5005");
}); 