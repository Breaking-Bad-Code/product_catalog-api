import {
  AllowNull,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from './product.js';

@Table({
  tableName: 'colors',
})

export class Color extends Model {
  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @Column({
    type: DataTypes.STRING,
  })
    color: string;
}
