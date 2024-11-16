import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface PermissionToUserCreationAttributes{
  userId: string;
  permissionId: string;
}
interface PermissionToUserAttributes{
  id: string;
  userId?: string;
  permissionId?: string;
}

export interface PermissionToUserInstance
  extends Model<PermissionToUserAttributes, PermissionToUserCreationAttributes>,
    PermissionToUserAttributes {}

const PermissionToUser = sequelize.define<PermissionToUserInstance>('permission_to_user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  }
}, {
  timestamps: false
});

export default PermissionToUser;