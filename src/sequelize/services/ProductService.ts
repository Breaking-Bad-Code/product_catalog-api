import { OrderItem, Sequelize } from 'sequelize';
import { Phone } from '../../types/Phone.js';
import { Product as ProductModel } from '../models/product.js';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { PhoneDetails } from '../../types/PhoneDetails.js';
import {  Cell as CellModel } from '../models/cell.js';
import {  Color as ColorModel } from '../models/color.js';
import {  Capacity as CapacityModel } from '../models/capacity.js';
import {  Image as ImageModel } from '../models/image.js';
import {  Title as TitleModel } from '../models/title.js';
import { Description as DescriptionModel } from '../models/description.js';
const __dirname = path.resolve();

function unpackData(responce) {
  return responce.map(item => item.dataValues);
}

function getValues(data) {
  const values = []; 
  data.forEach(obj => {
    values.push(...Object.values(obj));
  });

  return values;
}

export class ProductService {
  getProducts = async (
    order: OrderItem[],
    where: {[name: string]: string | number},
    from: number,
    to: number
  ): Promise<Phone[]> => {
    const products = await ProductModel.findAll({
      where,
      order,
      limit: to - from,
      offset: from,
    });

    return unpackData(products);
  };

  getProductById = async (
    productId: string,
  ): Promise<any> => {

    const phone = ProductModel.findByPk(productId, {
      // DONT WORK PROPERLY
      // include: [
      //   {
      //     model: Cell,
      //     required: false,
      //   },
      //   {
      //     model: Image,
      //     required: false,
      //   },
      //   {
      //     model: Capacity,
      //     required: false,
      //   },
      //   {
      //     model: Title,
      //     required: false,
      //   },
      //   {
      //     model: Color,
      //     required: false,
      //   },
      // ]
    });

    return phone;
  };

  getDiscounts = async (
    order: OrderItem[],
    where: {[name: string]: string | number},
    from: number,
    to: number,
  ): Promise<Phone[]> => {
    const products = await ProductModel.findAll({
      attributes: {
        include: [
          [Sequelize.literal('("fullPrice" - "price")'), 'diff'],
        ]
      },
      where,
      order: [
        ['diff', 'DESC'],
        ...order
      ],
      limit: to - from,
      offset: from,
    });

    return unpackData(products);
  };

  getRecomended = async (
    order: OrderItem[],
    where: {[name: string]: string | number},
    from: number,
    to: number
  ): Promise<Phone[]> => {
    const products = await ProductModel.findAll({
      where,
      order,
      limit: to - from,
      offset: from,
    });

    return unpackData(products);
  };

  getCells = async (phoneId: string): Promise<any[]> => {
    const cells = await CellModel.findAll({
      where: { phoneId },
      attributes: ['cell'],
    });

    return getValues(unpackData(cells));
  };

  getColors = async (phoneId: string): Promise<any[]> => {
    const colors = await ColorModel.findAll({
      where: { phoneId },
      attributes: ['color'],
    });

    return getValues(unpackData(colors));
  };

  getImages = async (phoneId: string): Promise<any[]> => {
    const images = await ImageModel.findAll({
      where: { phoneId },
      attributes: ['image'],
    });

    return getValues(unpackData(images));
  };

  getCapacities = async (phoneId: string): Promise<any[]> => {
    const capasities = await CapacityModel.findAll({
      where: { phoneId },
      attributes: ['capacity'],
    });

    return getValues(unpackData(capasities));
  };

  getTitles = async (phoneId: string): Promise<any[]> => {
    const titles = await TitleModel.findAll({
      where: { phoneId },
      attributes: ['title', 'id'],
    });

    return unpackData(titles);
  };

  getDescription = async (title_id: number): Promise<any[]> => {
    const descriptions = await DescriptionModel.findAll({
      where : { title_id: title_id.toString() },
      attributes: ['text'],
    });

    return getValues(unpackData(descriptions));
  };

  getProductsPage = async (
    order: OrderItem[],
    where: {[name: string]: string | number},
    from: number,
    to: number
  ): Promise<Phone[]> => {
    const phones = await ProductModel.findAll({
      where,
      order,
      limit: to - from,
      offset: from,
    });

    return phones;
  };

  addProduct = async (product) => {
    await ProductModel.create(product);
  };

  seed = async () => {

    await ProductModel.drop();
    await CellModel.drop();
    await ColorModel.drop();
    await CapacityModel.drop();
    await ImageModel.drop();
    await TitleModel.drop();
    await DescriptionModel.drop();

    await ProductModel.sync();
    await CellModel.sync();
    await ColorModel.sync();
    await CapacityModel.sync();
    await ImageModel.sync();
    await TitleModel.sync();
    await DescriptionModel.sync();

    const mainFilePath = path.join(
      __dirname,
      'public',
      'api',
      'phones.json',
    );

    const data = await fsPromises.readFile(mainFilePath);
    const rawData = Buffer.from(data).toString();
    const phones: Phone[] = JSON.parse(rawData);
    let counter = 1;

    for (const phone of phones) {
      const filePath = path.join(
        __dirname,
        'public',
        'api',
        'phones',
        `${phone.itemId}.json`,
      );

      const data = await fsPromises.readFile(filePath);
      const rawData = Buffer.from(data).toString();
      const phoneDetails: PhoneDetails = JSON.parse(rawData);
      
      const {
        description,
        cell,
        images,
        colorsAvailable,
        capacityAvailable,
        priceRegular,
        priceDiscount,
        ...rest
      } = phoneDetails;

      const phoneId = rest.id;
      

      const descriptionWithIds = description.map(desc => ({
        ...desc,
        id: counter++,
      }));

      const descriptionTexts = [];

      descriptionWithIds.forEach(
        ({ text, id }) => descriptionTexts.push(
          ...text.map(txt => ({ title_id: id , text: txt }))
        )
      );

      await ProductModel.create({
        ...rest,
        itemId: rest.id,
        price: priceDiscount,
        fullPrice: priceRegular,
        category: 'phones',
        year: phone.year,
        image: phone.image,
      });

      await CellModel.bulkCreate(cell.map(cell => ({ phoneId, cell })));
      await ColorModel.bulkCreate(colorsAvailable.map(
        color => ({ phoneId, color })
      ));
      await CapacityModel.bulkCreate(capacityAvailable.map(
        capacity => ({ phoneId, capacity }))
      );
      await ImageModel.bulkCreate(
        images.map(image => ({ phoneId, image })),
        {
          ignoreDuplicates: true,
        });
      await TitleModel.bulkCreate(
        descriptionWithIds.map(
          ({ title, id }) => ({ phoneId, id , title })
        ),
        {
          ignoreDuplicates: true,
        }
      );
      await DescriptionModel.bulkCreate(descriptionTexts);   
    }
  };

  getLength = async (where: {[name: string]: string | number}) => {
    return await ProductModel.count({
      where
    });
  };
}