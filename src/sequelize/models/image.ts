import {
  AllowNull,
  BelongsTo,
  Column,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from './product.js';

@Table({
  tableName: 'images',
  timestamps: false,
})

@DefaultScope(() => ({
  attributes: ['image'],
}))

export class Image extends Model {
  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @Column({
    type: DataTypes.STRING,
  })
    image: string;

  // @BelongsTo(() => Product)
  //   product: Product;
}
