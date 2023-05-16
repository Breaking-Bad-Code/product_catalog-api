import {
  AllowNull,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Category } from '../../types/Category.js';
import { Cell } from './cell.js';
import { Capacity } from './capacity.js';
import { Color } from './color.js';
import { Image } from './image.js';
import { Title } from './title.js';

@Table({
  tableName: 'products',
})

export class Product extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    itemId: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    category: Category;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    price: number;

  @Column({
    type: DataTypes.INTEGER,
  })
    fullPrice: number;

  @Column({
    type: DataTypes.INTEGER,
  })
    year: number;

  @Column({
    type: DataTypes.STRING,
  })
    screen: string;
    
  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;

  @Column({
    type: DataTypes.STRING,
  })
    color: string;

  @Column({
    type: DataTypes.STRING,
  })
    ram: string;

  @Column({
    type: DataTypes.STRING,
  })
    image: string;

  @Column({
    type: DataTypes.STRING,
  })
    namespaceId: string;

  @Column({
    type: DataTypes.STRING,
  })
    resolution: string;

  @Column({
    type: DataTypes.STRING,
  })
    processor: string;

  @Column({
    type: DataTypes.STRING,
  })
    zoom: string;

  @HasMany(() => Cell)
    cell: Cell[];
    
  @HasMany(() => Capacity)
    capacityAvailable: Capacity[];

  @HasMany(() => Color)
    colorsAvailable: Color[];

  @HasMany(() => Image)
    images: Image[];

  @HasMany(() => Title)
    description: Title[];
}
