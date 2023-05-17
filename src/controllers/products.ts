// import fs, { PathLike, promises as fsPromises } from 'fs';
import { Request, Response } from 'express';
import { ProductService } from '../sequelize/services/ProductService.js';
import { OrderItem } from 'sequelize';
import { Op } from 'sequelize';

const productsDb = new ProductService();

interface getPhonesQuery {
  from?: string;
  to?: string;
  sort?: string;
  productType?: string; 
  searchQuery?: string;
}

const sendDbRequest = async(
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response,
  operation,
) => {
  const {
    from,
    to,
    sort,
    productType,
    searchQuery,
    ...filters
  } = req.query;  


  if (productType !== undefined) {
    filters['category'] = productType;
  }

  if (searchQuery !== undefined) {
    filters['name'] = {
      [Op.iLike]: `%${searchQuery}%`
    };
  }

  let fromValue = Number(from);
  let toValue = Number(to);
  const total = await productsDb.getLength(filters);
  const sortBy: OrderItem[] = [];

  if (sort !== undefined) {
    sort.split(',')
      .map(sortParam => {
        const [name, order] = sortParam.split(':');
        sortBy.push([name, order]);
      });
  }
   
  if (isNaN(fromValue) || isNaN(toValue)) {
    if (fromValue > toValue) {
      res.sendStatus(400);

      return;
    }

    fromValue = 0;
    toValue = total;
  }

  const selectedPhones = await operation(
    sortBy,
    filters,
    fromValue,
    toValue,
  );

  res.json({
    total,
    data: selectedPhones,
  });
};

const getProducts = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  
  sendDbRequest(req, res, productsDb.getProductsPage);
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (productId === undefined) {
    res.sendStatus(400);

    return;
  }

  const phone = await productsDb.getProductById(productId);

  if (!phone) {
    res.sendStatus(404);

    return;
  }

  
  const capacityAvailable = await productsDb.getCapacities(productId);
  const cell = await productsDb.getCells(productId);
  const colorsAvailable = await productsDb.getColors(productId);
  const images = await productsDb.getImages(productId);
  const titles = await productsDb.getTitles(productId);

  const fullPhone = {
    ...phone.dataValues,
    cell,
    capacityAvailable,
    colorsAvailable,
    images,
    description: [],
  };

  for (const { title, id } of titles) {
    const text = await productsDb.getDescription(id);

    fullPhone.description.push({
      title,
      text,
    });
  }
  

  res.json(fullPhone);
};

const getNewProducts = (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  req.query.sort = 'year:desc';
  sendDbRequest(req, res, productsDb.getProductsPage);
};

const getHotDeals = (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  sendDbRequest(req, res, productsDb.getDiscounts);
};

const getRecomended = async (
  req: Request,
  res: Response,
) => {

  const { productId } = req.params;

  if (productId === undefined) {
    res.sendStatus(400);

    return;
  }

  const phone = await productsDb.getProductById(productId);
  if (!phone) {
    res.sendStatus(404);

    return;
  }
  req.query.namespaceId = phone.namespaceId;

  req.query.id = {
    [Op.not]: phone.id
  };

  sendDbRequest(req, res, productsDb.getRecomended);
};

export default {
  getProducts,
  getProductById,
  getNewProducts,
  getHotDeals,
  getRecomended,
};
