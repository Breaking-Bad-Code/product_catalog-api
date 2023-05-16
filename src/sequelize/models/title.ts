import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Product } from './product.js';
import { Description } from './description.js';

@Table({
  tableName: 'titles',
  timestamps: false,
})

@DefaultScope(() => ({
  attributes: ['title'],
}))

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

  @HasMany(() => Description)
    description: Description[];
  // @BelongsTo(() => Product)
  //   product: Product;
}
