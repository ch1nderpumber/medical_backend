import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface UserCreationAttributes{
  email: string;
  password: string
  name: string;
  lastname: string;
  patronymic: string;
}
interface UserAttributes{
  id: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  patronymic: string;
  passwordResetHash?: string | null;
}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patronymic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordResetHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  timestamps: false,
});

export default User;