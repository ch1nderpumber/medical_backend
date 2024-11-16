import {NextFunction, Response, Request} from 'express';
import PermissionService from '../services/permission.service';
import {PermissionDTO} from '../dtos/Permission.dto';
import ProductService from "../services/product.service";
import TableService from "../services/table.service";
import {stringToArray} from "../utils/stringToArray";

/**
 * Получить все продукты по фильтру
 * @route GET /api/product
 * @group Продукт
 * @param {ProductDTO.model} input.query
 * @returns {ProductWithCountDTO.model} 201 - Вернет тип дефекта (отклонение) или массив ип дефекта (отклонение), если не указывать id.
 * @returns 400 - [PERMISSION_NOT_FOUND] Разрешение не найдено.
 */


class TableController {
  async Defects(req: Request, res: Response, next: NextFunction){
    try{
      let {
		  styleIds,
			sizeIds,
			roundIds,
			shiftIds,
			dates,
	  } = req.query;
	  
	  const table = await TableService.Defects(
		  stringToArray(styleIds as string),
		  stringToArray(sizeIds as string),
		  stringToArray(roundIds as string),
		  stringToArray(shiftIds as string),
		  stringToArray(dates as string)
	  );
      
      res.json(table);
    }
    catch (err) {
      next(err);
    }
  }
}



export default new TableController();