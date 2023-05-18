import {
  Column,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.js';

@Table({
  tableName: 'cart',
})

@DefaultScope(() => ({
  attributes: ['phoneId', 'quantity'],
}))

export class Cart extends Model {

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.STRING,
  })
    userId: string;

  @Column({
    type: DataTypes.INTEGER,
  })
    quantity: number;

  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;
}
