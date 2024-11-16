import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface PermissionCreationAttributes{
  value: string;
  name: string;
}
interface PermissionAttributes{
  id: string;
  value: string;
  name: string;
}

export interface PermissionInstance
  extends Model<PermissionAttributes, PermissionCreationAttributes>,
    PermissionAttributes {}

const Permission = sequelize.define<PermissionInstance>('permission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default Permission;