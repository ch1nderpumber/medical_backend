import {NextFunction, Response, Request} from 'express';
import ApiError from '../exceptions/ApiError';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import {AuthorizationDTO} from '../dtos/Authorization.dto';
import {UserDTO} from '../dtos/User.dto';
import MailService from '../services/mail.service';
import {RequestSuccessDTO} from '../dtos/RequestSuccess.dto';
import {Logger} from '../utils/logger';
import {passwordResetEmailTemplate} from '../templates/passwordResetEmailTemplate';

/**
 * Авторизация пользователя
 * @route POST /api/auth/login
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {SignInDTO.model} input.body.required
 * @returns {AuthorizationDTO.model} 200 - Авторизационные данные пользователя и пара токенов.
 * @returns 400 - [SIGN_IN_FAILED] Ошибка авторизации. Адрес электронной почты или пароль неверны.
 * @returns 400 - [VALIDATION_ERROR] Одно или несколько полей содержат ошибку.
 */

/**
 * Ригистрация пользователя
 * @route POST /api/auth/registration
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {SignUpDTO.model} input.body.required
 * @returns {AuthorizationDTO.model} 200 - Авторизационные данные пользователя и пара токенов.
 * @returns 400 - [USER_ALREADY_EXIST] Пользователь с такой почтой уже существует.
 * @returns 400 - [VALIDATION_ERROR] Одно или несколько полей содержат ошибку.
 */

/**
 * Отправит запрос на сброс пароля, на почту придет письмо с инструкцией
 * @route POST /api/auth/sendResetPassword
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {EmailDTO.model} input.body.required
 * @returns {RequestSuccessDTO.model} 200 - Успешный ли запрос
 * @returns 400 - [USER_NOT_FOUND] Пользователь с такой почтой не существует.
 * @returns 400 - [VALIDATION_ERROR] Одно или несколько полей содержат ошибку.
 */

/**
 * Изменит пароль пользователя
 * @route POST /api/auth/resetPassword/:uuid
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {EmailDTO.model} input.body.required
 * @param {string} uuid.params.required - UUID сброса пароля.
 * @returns {AuthorizationDTO.model} 200 - Авторизационные данные пользователя и пара токенов.
 * @returns 400 - [USER_NOT_FOUND] Пользователь с такой почтой не существует.
 * @returns 400 - [VALIDATION_ERROR] Одно или несколько полей содержат ошибку.
 */

/**
 * Обновить токены (refresh)
 * @route POST /api/auth/refresh
 * @group Авторизация (пользователь) - Методы авторизации пользователя
 * @param {string} refresh_token.header.required - refresh_token
 * @returns {TokenDTO.model} 200 - Пара токенов.
 * @returns 400 - [INVALID_REFRESH_TOKEN] Неверный токен.
 */

class AuthController{
  async Login(req: Request, res: Response, next: NextFunction){
    try{
      const {email, password} = req.body;

      const user = await UserService.Get({email: email})
      
      if(! user) {
        throw ApiError.Custom('SIGN_IN_FAILED');
      }
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      
      if(!isPasswordCorrect) {
        throw ApiError.Custom('SIGN_IN_FAILED');
      }
      
      const userData = new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email);
      const tokenData = TokenService.GenerateTokens({userId: user.id})
      
      await TokenService.SaveToken(user.id, tokenData.refresh_token);
      
      res.json(new AuthorizationDTO(userData, tokenData));
    }
    catch (err) {
      next(err);
    }
  }

  async Register(req: Request, res: Response, next: NextFunction){
    try{
      const {
        email,
        password,
        name,
        lastname,
        patronymic
      } = req.body;
      
      const user = await UserService.Create(email, name, lastname, patronymic, password);
      
      const userData = new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email);
      const tokens = TokenService.GenerateTokens({userId: user.id})
      
      res.json(
        new AuthorizationDTO(
          userData,
          tokens
        )
      );

    }
    catch (err) {
      next(err);
    }
  }
  
  async SendResetPassword(req: Request, res: Response, next: NextFunction){
    try{
      const {email} = req.body;
      const hash = await UserService.generateResetHash(email as string);
      
      await MailService.SendMail({
        recipient: email as string,
        title: 'Восстановления пароля',
        HTML: passwordResetEmailTemplate(hash)
      })
      
      res.json(new RequestSuccessDTO(true));
    }
    catch (err) {
      Logger.error(err)
      next(err);
    }
  }
  
  async ResetPassword(req: Request, res: Response, next: NextFunction){
    try{
      const {hash} = req.params;
      
      const {password} = req.body;
      
      const user = await UserService.resetPassword(hash as string, password);
      
      const userData = new UserDTO(user.id, user.name, user.lastname, user.patronymic, user.email);
      const tokenData = TokenService.GenerateTokens({userId: user.id})
      
      res.json(new AuthorizationDTO(userData, tokenData));
    }
    catch (err) {
      next(err);
    }
  }
  
  
  
  async Refresh(req: Request, res: Response, next: NextFunction){
    try {
      const {authorization} = req.headers;
      if(! authorization || ! authorization.includes('Bearer') ) {
        throw ApiError.Custom('INVALID_REFRESH_TOKEN');
      }
      const token = (authorization as string).split(' ')[1];
      const payload = TokenService.ValidateRefreshToken(token);
      const dbToken = await TokenService.FindToken(token);
      
      if(! dbToken) {
        throw ApiError.Custom('INVALID_REFRESH_TOKEN');
      }
      
      await dbToken.destroy()
      
      const tokens = TokenService.GenerateTokens({userId: payload.userId});
      await TokenService.SaveToken(payload.userId, tokens.refresh_token);
      
      res.json(tokens);
    }
    catch (err) {
      next(err);
    }
  }
}

export default new AuthController();