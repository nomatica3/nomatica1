const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// In-memory data store (for demo purposes)
let items = [
  { id: 1, name: 'Item One', description: 'First item description' },
  { id: 2, name: 'Item Two', description: 'Second item description' }
];

// Home route - list items
app.get('/', (req, res) => {
  res.render('index', { items });
});

// Show form to add new item
app.get('/add', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});