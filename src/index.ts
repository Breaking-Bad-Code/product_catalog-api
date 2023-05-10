


import express from "express";
import cors from 'cors';
import { router as phoneRouter } from './routers/phones.js'

const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))
app.use('/phones', phoneRouter)

app.get('/', (req, res) => {
  res.send("<p>Hello world!</p>");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
