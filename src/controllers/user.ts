import { Request, Response } from 'express';
import { UserService } from '../sequelize/services/UserService.js';

const userDb = new UserService();

const checkUser = async (
  req: Request,
  res: Response,
) => {
  userDb.addUser(req.body);

  res.sendStatus(200);
};

const getOrders = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.body;

  console.log(userId);

  if (userId === undefined || userId === 'undefined') {
    res.sendStatus(400);

    return;
  }

  const orders = await userDb.getUserOrders(userId);

  res.json(orders);
};

const createOrder = async (
  req: Request,
  res: Response,
) => {
  const { userId, order } = req.body;

  if (userId === undefined || order === undefined) {
    res.sendStatus(400);

    return;
  }

  order.data = order.data.map(({ id, quantity }) => ({
    phoneId: id,
    quantity,
  }));

  await userDb.addUserOrder(userId, order);

  res.json({ status: 200 });
};

const getOrderDetails = async (
  req: Request,
  res: Response,
) => {
  const { orderId } = req.params;

  if (orderId === undefined) {
    res.sendStatus(400);

    return;
  }

  const positions = await userDb.getOrderPositions(orderId);

  res.json(positions);
};

const getFavourites = async (
  req: Request,
  res: Response,
) => {
  const { userId, operation, data } = req.body;

  if (userId === undefined) {
    res.sendStatus(400);

    return;
  }

  if (operation === 'get') {
    const favourites = await userDb.getUserFavourites(userId);
    
    res.json(favourites);

    return;
  } else if (operation === 'post' && Array.isArray(data)) {
    
    await userDb.saveUserFavourites(userId, data);

    res.json({ status: 200 });

    return;
  }

  res.sendStatus(404);
};

const getCart = async (
  req: Request,
  res: Response,
) => {
  const { userId, operation, data } = req.body;

  if (userId === undefined) {
    res.sendStatus(400);

    return;
  }

  if (operation === 'get') {
    const cart = await userDb.getUserCart(userId);

    res.json(cart);

    return;
  } else if (operation === 'post' && Array.isArray(data)) {
    const correctData = data.map(({ id, quantity }) => ({
      phoneId: id,
      quantity,
    }));

    await userDb.saveUserCart(userId, correctData);

    res.json({ status: 200 });

    return;
  }

  res.sendStatus(404);
};

export default {
  checkUser,
  getFavourites,
  getCart,
  getOrders,
  createOrder,
  getOrderDetails,
};