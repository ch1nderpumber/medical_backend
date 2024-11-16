import {NextFunction, Response, Request} from 'express';
import {ShiftDTO} from '../dtos/Shift.dto';
import ShiftService from '../services/shift.service';

/**
 * Добавление смены
 * @route POST /api/product/shift
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {ShiftInputDTO.model} input.body.required
 * @returns {ShiftDTO.model} 200 - Вернет созданный размер.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние размера.
 */


/**
 * Изменение смены
 * @route PUT /api/product/shift
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {ShiftDTO.model} input.body.required
 * @returns {ShiftDTO.model} 200 - Вернет измененный размер.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние размера.
 */

/**
 * Получение смены
 * @route GET /api/product/shift
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {string} id.query
 * @returns {ShiftDTO.model} 200 - Вернет смену или массив смен, если не указывать id.
 * @returns {ShiftDTO[]} 201 - Вернет смену или массив смен, если не указывать id.
 * @returns 400 - [SHIFT_ALREADY_EXISTS] Смена с таким наименованием уже существует.
 * @returns 400 - [SHIFT_INVALID] Неверное наименовние смены.
 */

class ShiftController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      const {value} = req.body;
      const shift = await ShiftService.Create(parseInt(value));
      
      res.send(new ShiftDTO(shift.id, shift.value, shift.active));
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
        const shifts = await ShiftService.Get({id: id as string}, isFull)
        res.json(shifts);
        return
      }
      
      const shifts = await ShiftService.GetAll(isFull)
      res.json(shifts);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const shifts = ShiftService.GetAll()
      res.json(shifts);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id, value, active} = req.body;
      const shift = await ShiftService.Update(id, value, active);
      
      res.send(new ShiftDTO(shift.id, shift.value, shift.active));
    }
    catch (err) {
      next(err);
    }
  }
}



export default new ShiftController();