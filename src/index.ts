
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { router as phoneRouter } from './routers/phones.js';
import { router as productsRouter } from './routers/products.js';
import { connect } from './sequelize/db.js';
import { ProductService } from './sequelize/services/ProductService.js';
import { router as userRouter } from './routers/user.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;


connect().then(() => {
// *** seeder for database. run npm start seed to rebuild database *** 
  if (process.argv.includes('seed')) {
    const productsDb = new ProductService();
    productsDb.seed();
  }

});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/phones', phoneRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
