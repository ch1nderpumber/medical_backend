import {NextFunction, Response, Request} from 'express';
import ApiError from '../exceptions/ApiError';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import {AuthorizationDTO} from '../dtos/Authorization.dto';
import ProductService from '../services/product.service';
import DefectService from '../services/defect.service';
import {getAuthUser} from '../middlewares/CheckAuth';

/**
 * Авторизация пользователя
 * @route POST /api/auth/login
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {SignInDTO.model} input.body.required
 * @returns {AuthorizationDTO.model} 200 - Авторизационные данные пользователя и пара токенов.
 * @returns 400 - [SIGN_IN_FAILED] Ошибка авторизации. Адрес электронной почты или пароль неверны.
 * @returns 400 - [VALIDATION_ERROR] Одно или несколько полей содержат ошибку.
 */



class DefectController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      
      const {rejectId, side, count, styleId, sizeId, roundId, shiftId, date} = req.body;
      const userId = getAuthUser(req).id;
      
      await DefectService.Add(rejectId, side, count, styleId, sizeId, roundId, shiftId, date, userId);
      
      res.status(200).send();
    }
    catch (err) {
      next(err);
    }
  }
	
	async Get(req: Request, res: Response, next: NextFunction){
		try{
			const {side, userId, productsId, rejectId} = req.query;
			
			// @ts-ignore
			const defects = await DefectService.GetAll({side, userId, productsId, rejectId});
			
			res.json(defects);
		}
		catch (err) {
			next(err);
		}
	}
	
	async Update(req: Request, res: Response, next: NextFunction){
		try{
			const {id, count} = req.body;
			
			const defects = await DefectService.Update(id, count);
			
			res.json(defects);
		}
		catch (err) {
			next(err);
		}
	}
	
	async Delete(req: Request, res: Response, next: NextFunction){
		try{
			const {id} = req.query;
			
			await DefectService.Delete(id as string);
			
			res.status(200).send();
		}
		catch (err) {
			next(err);
		}
	}
}

export default new DefectController();