import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';
import {Side} from '../types/Side';

interface DefectsCreationAttributes{
  rejectId: string;
  productsId: string;
  side: Side;
  count: number;
  userId: string;
}
interface DefectsAttributes{
  id: string;
  rejectId?: string;
  productsId?: string;
  side: Side;
  count: number;
}

export interface DefectsInstance
  extends Model<DefectsAttributes, DefectsCreationAttributes>,
    DefectsAttributes {}

const Defects = sequelize.define<DefectsInstance>('defects', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  side: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Defects;