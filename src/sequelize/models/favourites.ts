import {
  AllowNull,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.js';

@Table({
  tableName: 'favourites',
})


export class Favourites extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.STRING,
  })
    userId: string;

  @Column({
    type: DataTypes.STRING,
  })
    phoneId: string;

}
