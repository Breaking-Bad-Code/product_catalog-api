
import express, { Router } from 'express';

import userController from '../controllers/user.js';


export const router: Router = express.Router();

router.use(express.json());

router.get('/favourites', userController.getFavourites);
router.get('/cart', userController.getCart);
router.get('/orders/:orderId', userController.getOrderDetails);
router.post('/', userController.checkUser);
router.post('/orders', userController.getOrders);
router.post('/orders/new', userController.createOrder);
router.post('/favourites', userController.saveFavourites);
router.post('/cart', userController.saveCart);
