import {NextFunction, Response, Request} from 'express';
import SizeService from '../services/size.service';
import {SizeDTO} from '../dtos/Size.dto';

/**
 * Добавление размера
 * @route POST /api/product/size
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {SizeInputDTO.model} input.body.required
 * @returns {SizeDTO.model} 200 - Вернет созданный размер.
 * @returns 400 - [SIZE_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SIZE_INVALID] Неверное наименовние размера.
 */


/**
 * Изменение размера
 * @route PUT /api/product/size
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {SizeDTO.model} input.body.required
 * @returns {SizeDTO.model} 200 - Вернет измененный размер.
 * @returns 400 - [SIZE_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SIZE_INVALID] Неверное наименовние размера.
 */

/**
 * Получение размера
 * @route GET /api/product/size
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {string} id.query
 * @returns {SizeDTO.model} 200 - Вернет размер или массив размеров, если не указывать id.
 * @returns {SizeDTO[]} 201 - Вернет размер или массив размеров, если не указывать id.
 * @returns 400 - [SIZE_ALREADY_EXISTS] Размер с таким наименованием уже существует.
 * @returns 400 - [SIZE_INVALID] Неверное наименовние размера.
 */

class SizeController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      const {value} = req.body;
      const size = await SizeService.Create(value);
      
      res.send(new SizeDTO(size.id, size.value, size.active));
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
        const sizes = await SizeService.Get({id: id as string}, isFull)
        res.json(sizes);
        return
      }
      
      const sizes = await SizeService.GetAll(isFull)
      res.json(sizes);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const sizes = SizeService.GetAll()
      res.json(sizes);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id, value, active} = req.body;
      const size = await SizeService.Update(id, value, active);
      
      res.send(new SizeDTO(size.id, size.value, size.active));
    }
    catch (err) {
      next(err);
    }
  }
}



export default new SizeController();