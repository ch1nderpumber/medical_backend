import {DataTypes, Model} from 'sequelize';
import sequelize from '../db';

interface TokenCreationAttributes{
  token: string;
  userId: string;
}
interface TokenAttributes{
  id: string;
  token: string;
  userId?: string;
  creationAt?: string;
}

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

const Token = sequelize.define<TokenInstance>('token', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Token;