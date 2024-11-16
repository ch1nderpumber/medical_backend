import {NextFunction, Response, Request} from 'express';
import PermissionService from '../services/permission.service';
import {PermissionDTO} from '../dtos/Permission.dto';
import ProductService from "../services/product.service";

/**
 * Получить все продукты по фильтру
 * @route GET /api/product
 * @group Продукт
 * @param {ProductDTO.model} input.query
 * @returns {ProductWithCountDTO.model} 201 - Вернет тип дефекта (отклонение) или массив ип дефекта (отклонение), если не указывать id.
 * @returns 400 - [PERMISSION_NOT_FOUND] Разрешение не найдено.
 */


class ProductController {
  async Get(req: Request, res: Response, next: NextFunction){
    try{
      const {
		  styleId,
			sizeId,
			roundId,
			shiftId,
			date,
		  limit,
		  page
	  } = req.query;
	  
      // @ts-ignore
	  const products = await ProductService.GetAndCountAll({sizeId, shiftId, styleId, roundId, date}, limit, page);
      
      res.json(products);
    }
    catch (err) {
      next(err);
    }
  }
  
  async Update(req: Request, res: Response, next: NextFunction){
	  try{
		  const {
			  id,
			  bars
		  } = req.body;
		  
		  const product = await ProductService.Update(id, bars);
		  res.json(product);
	  }
	  catch (err) {
		  next(err);
	  }
  }
}



export default new ProductController();