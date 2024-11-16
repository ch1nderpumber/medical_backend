import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface StyleCreationAttributes{
  value: string;
}
interface StyleAttributes{
  id: string;
  value: string;
  active: boolean;
}

export interface StyleInstance
  extends Model<StyleAttributes, StyleCreationAttributes>,
    StyleAttributes {}

const Style = sequelize.define<StyleInstance>('style', {
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

export default Style;