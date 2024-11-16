import {NextFunction, Response, Request} from 'express';
import PermissionService from '../services/permission.service';
import {PermissionDTO} from '../dtos/Permission.dto';
import ProductService from "../services/product.service";
import TableService from "../services/table.service";
import {stringToArray} from "../utils/stringToArray";
import ChartService from "../services/chart.service";
import DefectService from "../services/defect.service";

/**
 * Получить все продукты по фильтру
 * @route GET /api/product
 * @group Продукт
 * @param {ProductDTO.model} input.query
 * @returns {ProductWithCountDTO.model} 201 - Вернет тип дефекта (отклонение) или массив ип дефекта (отклонение), если не указывать id.
 * @returns 400 - [PERMISSION_NOT_FOUND] Разрешение не найдено.
 */


class ChartController {
  async DefectPoretto(req: Request, res: Response, next: NextFunction){
    try{
      let {
		  styleIds,
			sizeIds,
			roundIds,
			shiftIds,
			dates,
	  } = req.query;
	  
	  const data = await ChartService.DefectsPoretto(
		  stringToArray(styleIds as string),
		  stringToArray(sizeIds as string),
		  stringToArray(roundIds as string),
		  stringToArray(shiftIds as string),
		  stringToArray(dates as string)
	  );
      
      res.json({data});
    }
    catch (err) {
      next(err);
    }
  }
  
  async DefectAnalysis(req: Request, res: Response, next: NextFunction) {
	  try{
		  let {
			  rejectId,
			  dates,
		  } = req.query;
		  const data = await ChartService.DefectAnalysis(rejectId as string, stringToArray(dates as string))
		  res.json(data);
	  }
	  catch (err) {
		  next(err);
	  }
  }
	
	async HalfPair(req: Request, res: Response, next: NextFunction){
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



export default new ChartController();