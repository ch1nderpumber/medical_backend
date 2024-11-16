import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface RoundCreationAttributes{
  value: number;
}
interface RoundAttributes{
  id: string;
  value: number;
  active: boolean;
}

export interface RoundInstance
  extends Model<RoundAttributes, RoundCreationAttributes>,
    RoundAttributes {}

const Style = sequelize.define<RoundInstance>('round', {
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