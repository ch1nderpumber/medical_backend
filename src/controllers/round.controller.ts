import {NextFunction, Response, Request} from 'express';
import {RoundDTO} from '../dtos/Round.dto';
import RoundService from '../services/round.service';

/**
 * Добавление смены
 * @route POST /api/product/round
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {ShiftInputDTO.model} input.body.required
 * @returns {ShiftDTO.model} 200 - Вернет созданный размер.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние размера.
 */


/**
 * Изменение смены
 * @route PUT /api/product/round
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {ShiftDTO.model} input.body.required
 * @returns {ShiftDTO.model} 200 - Вернет измененный размер.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние размера.
 */

/**
 * Получение смены
 * @route GET /api/product/round
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {string} id.query
 * @returns {ShiftDTO.model} 200 - Вернет смену или массив смен, если не указывать id.
 * @returns {ShiftDTO[]} 201 - Вернет смену или массив смен, если не указывать id.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Смена с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние смены.
 */

class RoundController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      const {value} = req.body;
      const round = await RoundService.Create(parseInt(value));
      
      res.send(new RoundDTO(round.id, round.value, round.active));
    }
    catch (err) {
      next(err);
    }
  }
  
  async Get(req: Request, res: Response, next: NextFunction){
    try{
	  const {id, full} = req.query
	  const isFull = (full as string)?.toLowerCase() === 'true';
		
      if(id !== undefined){
        const rounds = await RoundService.Get({id: id as string}, isFull)
        res.json(rounds);
        return
      }
      
      const rounds = await RoundService.GetAll(isFull)
      res.json(rounds);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const rounds = RoundService.GetAll()
      res.json(rounds);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id, value, active} = req.body;
      const round = await RoundService.Update(id, value, active);
      
      res.send(new RoundDTO(round.id, round.value, round.active));
    }
    catch (err) {
      next(err);
    }
  }
}



export default new RoundController();