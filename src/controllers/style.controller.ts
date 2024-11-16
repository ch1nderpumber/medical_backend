import {NextFunction, Response, Request} from 'express';
import SizeService from '../services/size.service';
import StyleService from '../services/style.service';
import {StyleDTO} from '../dtos/Style.dto';

/**
 * Добавление стиля
 * @route POST /api/product/style
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {SizeInputDTO.model} input.body.required
 * @returns {SizeDTO.model} 200 - Вернет созданный стиль.
 * @returns 400 - [STYLE_ALREADY_EXISTS] Стиль с таким наименованием уже существует.
 * @returns 400 - [STYLE_INVALID] Неверное наименовние стиля.
 */


/**
 * Изменение стиля
 * @route PUT /api/product/style
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {SizeDTO.model} input.body.required
 * @returns {SizeDTO.model} 200 - Вернет измененный стиль.
 * @returns 400 - [STYLE_ALREADY_EXISTS] Стиль с таким наименованием уже существует.
 * @returns 400 - [STYLE_INVALID] Неверное наименовние размера.
 */

/**
 * Получение стияля
 * @route GET /api/product/style
 * @group Парамтеры продукта - Методы добавления, изменения и просмотра парамтеров продукта
 * @param {string} id.query
 * @returns {SizeDTO.model} 200 - Вернет стиль.
 * @returns {SizeDTO[]} 201 - Вернет стиль или массив стилей, если не указывать id.
 * @returns 400 - [STYLE_ALREADY_EXISTS] Стиль с таким наименованием уже существует.
 * @returns 400 - [STYLE_INVALID] Неверное наименовние стиля.
 */

class StyleController{
  async Add(req: Request, res: Response, next: NextFunction){
    try{
      const {value} = req.body;
      const style = await StyleService.Create(value);
      
      res.send(new StyleDTO(style.id, style.value, style.active));
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
        const style = await StyleService.Get({id: id as string}, isFull)
        res.json(style);
        return
      }
      
      const styles = await StyleService.GetAll(isFull)
      res.json(styles);
    }
    catch (err) {
      next(err);
    }
  }
  
  async GetAll(req: Request, res: Response, next: NextFunction){
    try{
      const styles = StyleService.GetAll()
      res.json(styles);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
    try{
      const {id, value, active} = req.body;
      const style = await StyleService.Update(id, value, active);
      
      res.send(new StyleDTO(style.id, style.value, style.active));
    }
    catch (err) {
      next(err);
    }
  }
}



export default new StyleController();