import {NextFunction, Response, Request} from 'express';
import RejectService from '../services/reject.service';
import {RejectDTO} from '../dtos/Reject.dto';

/**
 * Добавление типа дефакта (отклонения)
 * @route POST /api/product/reject
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {RejectInputDTO.model} input.body.required
 * @returns {RejectDTO.model} 200 - Вернет созданный тип дефекта (отклонение).
 * @returns 400 - [REJECT_ALREADY_EXISTS] Тип дефекта (отклонение) с таким наименованием уже существует.
 * @returns 400 - [REJECT_INVALID] Неверное наименовние типа дефекта (отклонения).
 */


/**
 * Изменение типа дефакта (отклонения)
 * @route PUT /api/product/reject
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {RejectDTO.model} input.body.required
 * @returns {RejectDTO.model} 200 - Вернет измененный тип дефекта (отклонение).
 * @returns 400 - [REJECT_ALREADY_EXISTS] Тип дефекта (отклонение) с таким наименованием уже существует.
 * @returns 400 - [REJECT_INVALID] Неверное наименовние типа дефекта (отклонения).
 */

/**
 * Получение типа дефакта (отклонения)
 * @route GET /api/product/reject
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {string} id.query
 * @returns {RejectDTO.model} 200 - Вернет тип дефекта (отклонение).
 * @returns {RejectDTO[]} 201 - Вернет тип дефекта (отклонение) или массив ип дефекта (отклонение), если не указывать id.
 * @returns 400 - [REJECT_ALREADY_EXISTS] Тип дефекта (отклонение) с таким наименованием уже существует.
 * @returns 400 - [REJECT_INVALID] Неверное наименовние типа дефекта (отклонения).
 */

/**
 * Перемещение дефактов (изменеение положение дефектов при получении данных)
 * @route PUT /api/product/reject/move
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {number} activeId.input.body
 * @param {number} overId.input.body
 * @returns 200 - Запрос выполнен.
 * @returns 400 - [INVALID_MOVE_KEYS] Ключи для перемещения неверны
 */

class RejectController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      const {name, alias} = req.body;
      const reject = await RejectService.Create(name, alias);
      
      res.send(new RejectDTO(reject.id, reject.name, reject.alias, reject.active, reject.key));
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
        const reject = await RejectService.Get({id: id as string}, isFull)
        res.json(reject);
        return
      }
      
      const rejects = await RejectService.GetAll(isFull)
      res.json(rejects);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const rejects = RejectService.GetAll()
      res.json(rejects);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id, name, alias, active} = req.body;
      const reject = await RejectService.Update(id, name, alias, active);
      
      res.send(new RejectDTO(reject.id, reject.name, reject.alias, reject.active, reject.key));
    }
    catch (err) {
      next(err);
    }
  }
  
  async Move(req: Request, res: Response, next: NextFunction) {
    try{
      const {activeId, overId} = req.body;
	  await RejectService.Mover(activeId, overId);
		  
	  res.status(200).send();
	}
	catch (err) {
	  next(err);
	}
  }
}



export default new RejectController();