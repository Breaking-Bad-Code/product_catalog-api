import {
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Order } from './order.js';

@Table({
  tableName: 'orderPositions',
})


export class OrderPosition extends Model {

  @ForeignKey(() => Order)
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
