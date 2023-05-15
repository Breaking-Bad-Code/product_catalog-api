// import fs, { PathLike, promises as fsPromises } from 'fs';
import { Request, Response } from 'express';
import { Phone } from '../types/Phone';
import { ProductService } from '../sequelize/services/ProductService.js';
import { OrderItem } from 'sequelize';

const productsDb = new ProductService();



interface getPhonesQuery {
  from?: string;
  to?: string;
  sort?: string;
  productType?: string; 
}

const getProducts = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  const { from, to, sort, productType, ...filters } = req.query;  

  if (productType !== undefined) {
    filters['category'] = productType;
  }

  const fromValue = Number(from);
  const toValue = Number(to);
  const total = await productsDb.getLength(filters);
  let selectedPhones: Phone[] = [];
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
    selectedPhones = await productsDb.getProducts(
      sortBy,
      filters,
    );
  } else {
    selectedPhones = await productsDb.getProductsPage(
      sortBy,
      filters,
      fromValue,
      toValue,
    );
  }

  res.json({
    total,
    data: selectedPhones,
  });
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (productId === undefined) {
    res.sendStatus(400);

    return;
  }

  const phones = await productsDb.getProducts(
    [],
    { id: productId },
  );

  if (phones.length < 1) {
    res.sendStatus(404);

    return;
  }

  
  const capacityAvailable = await productsDb.getCapacities(productId);
  const cell = await productsDb.getCells(productId);
  const colorsAvailable = await productsDb.getColors(productId);
  const images = await productsDb.getImages(productId);
  const titles = await productsDb.getTitles(productId);

  const phone = {
    ...phones[0],
    cell,
    capacityAvailable,
    colorsAvailable,
    images,
    description: [],
  };

  for (const { title, id } of titles) {
    const text = await productsDb.getDescription(id);

    phone.description.push({
      title,
      text,
    });
  }
  

  res.json(phone);
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
  getProducts(req, res);
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
  getProducts(req, res);
};

const getRecomended = (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  getProducts(req, res);
};

export default {
  getProducts,
  getProductById,
  getNewProducts,
  getHotDeals,
  getRecomended,
};
