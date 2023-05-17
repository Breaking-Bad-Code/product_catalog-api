import {
  AllowNull,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.js';
import { OrderPosition } from './orderPosition.js';

@Table({
  tableName: 'orders',
})


export class Order extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.STRING,
  })
    userId: string;

  @Default('created')
  @Column({
    type: DataTypes.STRING,
  })
    status: string;

  @Column({
    type: DataTypes.INTEGER,
  })
    total: number;

  @HasMany(() => OrderPosition)
    description: OrderPosition[];
}
