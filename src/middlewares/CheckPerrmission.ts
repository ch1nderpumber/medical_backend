import ApiError from '../exceptions/ApiError';
import {Request, Response, NextFunction} from 'express';
import {TPermissionItem} from '../constants/permissions';
import {getUserPermission} from './CheckAuth';


export default function (...permissions: TPermissionItem[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try{
      
      const userPermissions = getUserPermission(req);
	  
      for (const permission of permissions) {
        let isExist = false;
        for (const userPermission of userPermissions) {
          if(userPermission === permission){
            isExist = true;
          }
        }
		  if(! isExist) {
			  throw ApiError.Custom('PERMISSION_DENIED');
		  }
      }
      
      next();
    }
    catch (err) {
      next(err);
    }
  }
}