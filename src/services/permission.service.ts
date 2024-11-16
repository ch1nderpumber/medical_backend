import {Permission, User} from '../model';
import ApiError from '../exceptions/ApiError';
import UserService from './user.service';
import {PermissionToUser} from '../model/model';
import {Permissions} from '../constants/permissions';
import {PermissionDTO} from '../dtos/Permission.dto';

class PermissionService {
  async Give(id: string, permissionId: string) {
    const user = await UserService.Get({id});
    
    if(! user){
      throw ApiError.Custom('USER_NOT_FOUND');
    }
    
    const permission = await Permission.findOne({where: {id: permissionId}});
    
    if(! permission){
      throw ApiError.Custom('PERMISSION_NOT_FOUND');
    }
    
    const isUserHasPermission = !! await PermissionToUser.findOne(
      {
        where: {
          permissionId: permission.id,
          userId: user.id
        }
      }
    );
    
    if(isUserHasPermission){
      throw ApiError.Custom('PERMISSION_ALREADY_ADDED');
    }
    
    await PermissionToUser.create({permissionId: permission.id, userId: user.id});
  }
  
  
  async Get(id: string){
    
    const userWithPermissions = await User.findOne(
      {
        where: {id},
        include: [{
          model: Permission,
        }]
      });
    
    if(! userWithPermissions) {
      throw ApiError.Custom('USER_NOT_FOUND');
    }
    
    // @ts-ignore
    return userWithPermissions.permissions.map(permission => new PermissionDTO(permission.id, permission.value, permission.name));
  }
  
  async GetAllAvailable(){
    const permissions = await Permission.findAll();
    return permissions;
  }
  
  async TakeAway(id: string, permissionId: string) {
    const user = await UserService.Get({id});
    
    if(! user){
      throw ApiError.Custom('USER_NOT_FOUND');
    }
    
    const permission = await Permission.findOne({where: {id: permissionId}});
    
    if(! permission){
      throw ApiError.Custom('PERMISSION_NOT_FOUND');
    }
    
    const userPermission = await PermissionToUser.findOne(
      {
        where: {
          permissionId: permission.id,
          userId: user.id
        }
      }
    );
    
    if(! userPermission){
      throw ApiError.Custom('PERMISSION_NOT_FOUND');
    }
    
    await userPermission.destroy();
  }
}

export default new PermissionService();