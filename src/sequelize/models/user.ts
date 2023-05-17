import {
  AllowNull,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Order } from './order.js';

@Table({
  tableName: 'users',
})


export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
    googleId: string;

  @Column({
    type: DataTypes.STRING,
  })
    name: string;

  @Column({
    type: DataTypes.STRING,
  })
    email: string;

  @HasMany(() => Order)
    description: Order[];
}
