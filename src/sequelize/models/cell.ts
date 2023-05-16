import {
  AllowNull,
  Column,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from './product.js';

@Table({
  tableName: 'cells',
  timestamps: false,
})

@DefaultScope(() => ({
  attributes: ['cell'],
}))

export class Cell extends Model {
  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @Column({
    type: DataTypes.STRING,
  })
    cell: string;

  // @BelongsTo(() => Product)
  //   product: Product;
}
