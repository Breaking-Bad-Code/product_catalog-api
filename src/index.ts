
const phones = require('../public/api/phones.json');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send("<p>Hello world!</p>");
});

app.get('/phones', (req, res) => {
  res.json(phones);
});

app.get('/phones/:phoneId', (req, res) => {
  const { phoneId } = req.params

  const filePath = path.join(
    __dirname,
    '..',
    'public',
    'api',
    'phones',
    `${phoneId}.json`,
  );

  console.log(filePath)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.sendStatus(404)
  
      return
    }

    res.json(JSON.parse(Buffer.from(data).toString()))

  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
