import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface RejectCreationAttributes{
  name: string;
  alias: string;
}
interface RejectAttributes{
  id: string;
  name: string;
  alias: string;
  active: boolean;
  key: number
}

export interface RejectInstance
  extends Model<RejectAttributes, RejectCreationAttributes>,
    RejectAttributes {}

const Reject = sequelize.define<RejectInstance>('reject', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  alias: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  key: {
	type: DataTypes.INTEGER,
	allowNull: false,
	autoIncrement: true,
  }
}, {
  timestamps: false
});

export default Reject;