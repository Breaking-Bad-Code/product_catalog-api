import {
  AllowNull,
  Column,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Title } from './title.js';

@Table({
  tableName: 'descriptions',
  timestamps: false,
})

@DefaultScope(() => ({
  attributes: ['text'],
}))

export class Description extends Model {

  @ForeignKey(() => Title)
  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
    title_id: number;

  @Column({
    type: DataTypes.TEXT,
  })
    text: string;
}
