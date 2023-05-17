import {
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.js';

@Table({
  tableName: 'cart',
})

export class Cart extends Model {

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
  })
    orderId: number;

  @Column({
    type: DataTypes.INTEGER,
  })
    quantity: number;

  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;
}
