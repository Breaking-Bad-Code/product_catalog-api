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
  tableName: 'capacities',
  timestamps: false,
})

@DefaultScope(() => ({
  attributes: ['capacity'],
}))

export class Capacity extends Model {
  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @Column({
    type: DataTypes.STRING,
  })
    capacity: string;

  // @BelongsTo(() => Product)
  //   product: Product;
}
