import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Product } from './models/product.js';
import { Cell } from './models/cell.js';
import { Color } from './models/color.js';
import { Capacity } from './models/capacity.js';
import { Image } from './models/image.js';
import { Title } from './models/title.js';
import { Description } from './models/description.js';
dotenv.config();

const { FULL_ADDRESS } = process.env;

export const connect = async () => {
  const sequelize = new Sequelize(
    FULL_ADDRESS,
    {
      dialectOptions: {
        ssl: true,
      },
      models: [Product, Cell, Color, Capacity, Image, Title, Description]
    }
  );

  try {
    await sequelize.authenticate();

    await Product.sync();
    await Cell.sync();
    await Color.sync();
    await Capacity.sync();
    await Image.sync();
    await Title.sync();
    await Description.sync();

  } catch (error) {
    console.log(error);
  }

  return sequelize;
};
