import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface ProductsCreationAttributes{
  date: Date;
  bars: number;
  styleId: string;
  sizeId: string
  shiftId: string;
  roundId: string
}

interface ProductsAttributes{
  id: string;
  date: Date;
  bars: number;
  styleId?: string;
  sizeId?: string
  shiftId?: string;
  roundId?: string
}

export interface ProductsInstance
  extends Model<ProductsAttributes, ProductsCreationAttributes>,
    ProductsAttributes {}

const Products = sequelize.define<ProductsInstance>('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bars: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

export default Products;