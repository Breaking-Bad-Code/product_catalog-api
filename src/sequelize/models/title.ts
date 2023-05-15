import {
  AllowNull,
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from './product.js';

@Table({
  tableName: 'titles',
})

export class Title extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

  @Column({
    type: DataTypes.STRING,
  })
    title: string;
}
