import ApiError from '../exceptions/ApiError';
import {Request, Response, NextFunction} from 'express';
import TokenService from '../services/token.service';
import {Permission, User} from '../model';
import {UserInstance} from '../model/databaseModels/User';
import {TPermissionItem} from '../constants/permissions';

const INTERMEDIATE_DATA_KEY = 'intermediate';

export default async function(req: Request, res: Response, next: NextFunction) {
  try{
    const {authorization} = req.headers;
    
    if(! authorization || ! authorization.includes('Bearer') ) {
      throw ApiError.Custom('INVALID_ACCESS_TOKEN');
    }
    const token = (authorization as string).split(' ')[1];
    
    const payload = TokenService.ValidateAccessToken(token);
    
    const userWithPermissions = ( await User.findOne(
      {
        where: {id: payload.userId},
        include: [{
          model: Permission,
        }]
      })
    )
    
    if(! userWithPermissions) {
      throw ApiError.Custom('NOT_AUTH');
    }
    
    // @ts-ignore
    req[INTERMEDIATE_DATA_KEY] = {
      user: null,
      permissions: null
    }
    
    // @ts-ignore
    req[INTERMEDIATE_DATA_KEY].user = userWithPermissions.dataValues;
    // @ts-ignore
    req[INTERMEDIATE_DATA_KEY].permissions = userWithPermissions.permissions.map(item => item?.dataValues?.value).filter(item => item !== null);
    
    next();
  }
  catch (err) {
    next(err);
  }
}

export const getAuthUser = (req: Request): UserInstance => {
  // @ts-ignore
  return req[INTERMEDIATE_DATA_KEY].user || null;
}

export const getUserPermission = (req: Request): TPermissionItem[] => {
  // @ts-ignore
  return req[INTERMEDIATE_DATA_KEY].permissions || null;
}