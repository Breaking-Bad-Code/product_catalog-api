
const phones = require('../public/phones.json')
// main file to Create API Server

// pattern for CreateServer:

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("<p>Hello world!</p>");
});

app.get('/phones', (req, res) => {
  res.json(phones);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
