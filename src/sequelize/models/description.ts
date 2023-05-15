import {
  AllowNull,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Title } from './title.js';

@Table({
  tableName: 'descriptions',
})

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
