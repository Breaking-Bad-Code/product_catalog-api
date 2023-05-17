import { Request, Response } from "express";
import { UserService } from "../sequelize/services/UserService";

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

  if (userId === undefined) {
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

  await userDb.addUserOrder(userId, order);

  res.sendStatus(200);
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
  const { userId } = req.body;

  if (userId === undefined) {
    res.sendStatus(400);

    return;
  }

  // const orders = await userDb.get(userId);

  // res.json(orders);
  res.sendStatus(200);
};

const getCart = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.body;

  if (userId === undefined) {
    res.sendStatus(400);

    return;
  }

  // const orders = await userDb.get(userId);

  // res.json(orders);
  res.sendStatus(200);
};

const saveFavourites = async (
  req: Request,
  res: Response,
) => {
  const { userId, favourites } = req.body;

  if (userId === undefined || favourites === undefined) {
    res.sendStatus(400);

    return;
  }

  // await userDb.addUserOrder(userId, favourites);

  res.sendStatus(200);
};

const saveCart = async (
  req: Request,
  res: Response,
) => {
  const { userId, cart } = req.body;

  if (userId === undefined || cart === undefined) {
    res.sendStatus(400);

    return;
  }

  // await userDb.addUserOrder(userId, cart);

  res.sendStatus(200);
};

export default {
  checkUser,
  getFavourites,
  getCart,
  getOrders,
  createOrder,
  getOrderDetails,
  saveFavourites,
  saveCart,
};