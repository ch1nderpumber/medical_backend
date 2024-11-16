import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface ShiftCreationAttributes{
  value: number;
}
interface ShiftAttributes{
  id: string;
  value: number;
  active: boolean;
}

export interface ShiftInstance
  extends Model<ShiftAttributes, ShiftCreationAttributes>,
    ShiftAttributes {}

const Style = sequelize.define<ShiftInstance>('shift', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  value: {
    type: DataTypes.INTEGER,
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

export default Style;