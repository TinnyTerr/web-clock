const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let displayText = "";

app.use((req, res, next) => {
  if ([".ts", ".map"].includes(req.path)) {
    res.sendStatus(404);
  } else {
    next()
  }
})
app.use(express.static('public'));
app.use(express.json());

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get current display text
app.get('/api/info', (req, res) => {
  res.json({ message: displayText });
});

// Update display text via API
app.post('/api/info', (req, res) => {
  const { message } = req.body;
  if (message) {
    displayText = message;
    res.json({ status: 'success', message: 'Text updated' });
  } else {
    res.status(400).json({ status: 'error', message: 'No message provided' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
