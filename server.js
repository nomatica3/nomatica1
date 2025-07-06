require('dotenv').config();
const express = require('express');
const app = express();
const { Configuration, OpenAIApi } = require('openai');




app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/find-contracts', (req, res) => res.render('find-contracts'));
app.get('/submit-proposal', (req, res) => res.render('submit-proposal'));
app.get('/local-subcontractors', (req, res) => res.render('local-subcontractors'));
app.get('/vendor-portal', (req, res) => res.render('vendor-portal'));
app.get('/admin-portal', (req, res) => res.render('admin-portal'));

// In-memory data store (for demo purposes)
let items = [
  { id: 1, name: 'Item One', description: 'First item description' },
  { id: 2, name: 'Item Two', description: 'Second item description' }
];

// Home route - list items
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', items });
});

// Show form to add new item
app.get('/add', (req, res) => {
  res.locals.title = 'Add New Item';    
  res.render('add');
});


// Show form to add new item
app.get('/add', (req, res) => {
  // Render the add item form
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  // Check if user is authenticated before showing the form
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  // Render the add item form
  res.locals.title = 'Add New Item';    
  res.render('add');
});

// Handle new item submission
app.post('/add', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.redirect('/');
});

// Show item details
app.get('/item/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.render('item', { item });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Show contact form
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact Form:', { name, email, message });
  // You could save to a database or email here
  res.render('contact', { success: true, name });
});
// Show AI chat interface
app.get('/ai-chat', (req, res) => { 
  res.render('ai-chat');
});
app.use(express.static(path.join(__dirname, 'public')));
// Handle AI chat requests
app.post('/api/ai-chat', async (req, res) => {
  const { prompt } = req.body;
  console.log('AI Chat Prompt:', prompt);
  
  // Simulate AI response (replace with actual AI service call)
  const aiResponse = `AI Response to: ${prompt}`;
  
  res.json({ response: aiResponse });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

console.log("OpenAI Key:", process.env.OPENAI_API_KEY);

