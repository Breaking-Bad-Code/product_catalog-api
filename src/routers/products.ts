'use strict';

import express, { Router } from 'express';
import productsController from '../controllers/products.js';

export const router: Router = express.Router();

router.use(express.json());

router.get('/', productsController.getProducts);
router.get('/new', productsController.getNewProducts);
router.get('/discount', productsController.getHotDeals);

router.get('/:productId', productsController.getProductById);
router.get('/:productId/recomended', productsController.getRecomended);
