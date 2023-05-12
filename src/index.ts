


import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { router as phoneRouter } from './routers/phones.js';

const app: Express = express();


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/phones', phoneRouter);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <a href='/phones'>/phones</a></br>
    <a href='/phones?from=0&to=5'>/phones?from=0&to=5</a></br>
    <a href='/phones?id=1&id=2'>/phones?id=1&id=2</a></br>
    <a href='/phones/apple-iphone-7-32gb-black'>/phones/:phoneId</a></br>
    <a href='/img/phones/apple-iphone-7/black/00.jpg'>/:imgUrl</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
