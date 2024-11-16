import {NextFunction, Response, Request} from 'express';
import PermissionService from '../services/permission.service';
import {PermissionDTO} from '../dtos/Permission.dto';
import ProductService from "../services/product.service";
import TableService from "../services/table.service";
import {stringToArray} from "../utils/stringToArray";
import ChartService from "../services/chart.service";
import DefectService from "../services/defect.service";
import ExportService from "../services/export.service";



class ExportController {
  async ExportExel(req: Request, res: Response, next: NextFunction){
    try{
      let {
			dates,
	  } = req.query;
	
	  dates = stringToArray(dates as string);
	  
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.setHeader('Content-Disposition', `attachment; filename=${dates[0]}-${dates[1]}.xlsx`);
	  
	  const workbook = await ExportService.ExportExel(dates);
		
		await workbook.xlsx.write(res);
		res.end();
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
}



export default new ExportController();