import jwt from 'jsonwebtoken';
import config from 'config';
import {IPayload} from '../types/IPayload';
import {Token} from '../model';
import {TokenDTO} from '../dtos/Token.dto';
import ApiError from '../exceptions/ApiError';
import {Logger} from "../utils/logger";

class TokenService {
  public GenerateTokens(payload: IPayload) {
    const accessToken = jwt.sign(payload, config.get('JWT.ACCESS_SECRET') as string, {expiresIn: config.get('JWT.ACCESS_EXPIRES_IN')})
    const refreshToken = jwt.sign(payload, config.get('JWT.REFRESH_SECRET') as string, {expiresIn: config.get('JWT.REFRESH_EXPIRES_IN')})
    return new TokenDTO(accessToken, refreshToken)
  }

  public ValidateAccessToken(token: string) {
    try{
      return this.ValidateToken(token, config.get('JWT.ACCESS_SECRET') as string);
    }
    catch(err) {
      throw ApiError.Custom('INVALID_ACCESS_TOKEN');
    }
  }

  public ValidateRefreshToken(token: string): IPayload {
    try{
      return this.ValidateToken(token, config.get('JWT.REFRESH_SECRET') as string) as IPayload;
    }
    catch (err) {
      throw ApiError.Custom('INVALID_REFRESH_TOKEN');
    }
  }

  private ValidateToken(token: string, secret: string): IPayload {
    try {
      return jwt.verify(token, secret) as IPayload;
    } catch (e) {
      Logger.error('Token validation error: ' + e);
      throw new Error();
    }
  }

  public async SaveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({
      where: {
        userId: userId
      }
    })
    if (tokenData) {
      tokenData.token = refreshToken;
      await tokenData.save();
      return;
    }
    await Token.create({userId: userId, token: refreshToken});
  }

  public async RemoveToken(refreshToken: string) {
    await Token.destroy({
      where: {
        token: refreshToken
      }
    })
  }

  public async FindToken(refreshToken: string) {
    const tokenData = await Token.findOne({
      where: {
        token: refreshToken
      }
    })
    
    return tokenData;
  }
}

export default new TokenService();