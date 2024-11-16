import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface SizeCreationAttributes{
  value: string;
}
interface SizeAttributes{
  id: string;
  value: string;
  active: boolean;
}

export interface SizeInstance
  extends Model<SizeAttributes, SizeCreationAttributes>,
    SizeAttributes {}

const Size = sequelize.define<SizeInstance>('size', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false
});

export default Size;