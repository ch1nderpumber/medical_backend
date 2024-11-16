import {NextFunction, Request, Response} from 'express';
import UserService from '../services/user.service';
import {UserDTO} from '../dtos/User.dto';
import ApiError from '../exceptions/ApiError';
import {UserWithCountDTO} from "../dtos/UserWithCount.dto";

/**
 * Получение пользователя по id
 * @route GET /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @returns {UserDTO.model} 200 - Вернет пользоввателя.
 * @returns 400 - [USER_NOT_FOUND] - Пользователь не найден.
 */

/**
 * Получение всех пользователей
 * @route GET /api/user
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} limit.query - Лимит и page тут же передаем

 * @returns {UserWithCountDTO.model} 200 - Вернет пользователей с учетом limit и id.
 */


/**
 * Удаление пользователя по id
 * @route DELETE /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @returns 200 - Пользователь удален.
 * @returns 400 - [USER_NOT_FOUND] - Пользователь не найден.
 */

/**
 * Создание пользователя
 * @route POST /api/user
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {SignUpDTO.model} input.body.required
 * @returns {UserDTO.model} 200 - Вернет созданного пользователя.
 */

/**
 * Обновление данных пользователя
 * @route PUT /api/user/:id
 * @group Пользователь - Методы добавления, изменения и просмотра пользователей
 * @param {string} id.params.required
 * @param {SignUpDTO.model} input.body.required
 * @returns {UserDTO.model} 200 - Вернет обновленного пользователя.
 */

class UserController {
  async Get(req: Request, res: Response, next: NextFunction){
    try{
      const {id} = req.params;
      
      const user = await UserService.Get({id});
      
      if(! user){
        throw ApiError.Custom('USER_NOT_FOUND');
      }
      
      res.json(new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email));
    }
    catch (e){
      next(e);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const {limit, page} = req.query;
      
      const usersInstance = await UserService.GetAll(limit, page);
      
      const users = usersInstance.rows.map((user) => new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email));
      
      res.json(new UserWithCountDTO(users, usersInstance.count));
    }
    catch (e){
      next(e);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id} = req.params;
      const {email, name, lastname, patronymic, password} = req.body;
      
      const user = await UserService.Update(id, {email, name, lastname, patronymic, password});
      
      res.json(new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email));
    }
    catch (e){
      next(e);
    }
  }
  
  async Create(req: Request, res: Response, next: NextFunction){
    try{
      const {email, name, lastname, patronymic, password} = req.body;
      const user = await UserService.Create(email, name, lastname, patronymic, password);
      res.json(new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email));
    }
    catch (e){
      next(e);
    }
  }
  
  async Remove(req: Request, res: Response, next: NextFunction){
    try{
      const {id} = req.params;
      await UserService.Remove(id);
      res.status(200).send();
    }
    catch (e){
      next(e);
    }
  }
}

export default new UserController();