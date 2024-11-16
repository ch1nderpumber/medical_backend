import {NextFunction, Response, Request} from 'express';
import PermissionService from '../services/permission.service';
import {PermissionDTO} from '../dtos/Permission.dto';

/**
 * Выдача разрешения пользователю
 * @route POST /api/permission/give
 * @group Разрешения - Методы добавления, изменения и просмотра разрешений
 * @param {PermissionInputDTO.model} input.body.required
 * @returns 200 - Разрешение выдано.
 * @returns 400 - [USER_NOT_FOUND] Пользователь не найден.
 * @returns 400 - [PERMISSION_NOT_FOUND] Разрешение не найдено.
 */

/**
 * Лишение пользователя разрешения
 * @route POST /api/permission/takeAway
 * @group Разрешения - Методы добавления, изменения и просмотра разрешений
 * @param {PermissionInputDTO.model} input.body.required
 * @returns 200 - Пользователь лишен разрешения.
 * @returns 400 - [USER_NOT_FOUND] Пользователь не найден.
 * @returns 400 - [PERMISSION_NOT_FOUND] Разрешение не найдено.
 */

/**
 * Получение разрешений пользователя по id
 * @route GET /api/permission
 * @group Разрешения - Методы добавления, изменения и просмотра разрешений
 * @param {string} userId.query.required
 * @returns {PermissionDTO[]} 200 - Разрешения пользователя.
 * @returns 400 - [USER_NOT_FOUND] Пользователь не найден.
 */

/**
 * Получение всех достпных разрешений
 * @route GET /api/permission/getAllAvailable
 * @group Разрешения - Методы добавления, изменения и просмотра разрешений
 * @returns {PermissionDTO[]}  200 - Все доступные разрешения.
 */


class PermissionController {
  async Give(req: Request, res: Response, next: NextFunction){
    try{
      const {userId, permissionId} = req.body;
      await PermissionService.Give(userId, permissionId);
      
      res.status(200).send();
    }
    catch (err) {
      next(err);
    }
  }
  
  async Get(req: Request, res: Response, next: NextFunction){
    try{
      const {userId} = req.query;
      const permissions = await PermissionService.Get(userId as string);
      
      res.json(permissions);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAllAvailable(req: Request, res: Response, next: NextFunction){
    try{
      const permissions = await PermissionService.GetAllAvailable();
      
      res.json(permissions.map(permission => new PermissionDTO(permission.id, permission.value, permission.name)));
    }
    catch (err) {
      next(err);
    }
  }
  
  async TakeAway(req: Request, res: Response, next: NextFunction){
    try{
      const {userId, permissionId} = req.body;
      await PermissionService.TakeAway(userId, permissionId);
      
      res.status(200).send();
    }
    catch (err) {
      next(err);
    }
  }
}



export default new PermissionController();