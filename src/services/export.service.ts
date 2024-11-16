import {sortStringArray} from "../utils/sortStringArray";
import ExcelJS from 'exceljs';
import DefectService from "./defect.service";
import ProductService from "./product.service";
import StyleService from "./style.service";
import SizeService from "./size.service";
import ShiftService from "./shift.service";
import roundService from "./round.service";
import {parseDate} from "../utils/parseDate";
import {formatDate} from "../utils/formatDate";

interface IExelDefectsRow {
	date: string;
	shift: number;
	reject: string;
	count: number;
	styleSize: string;
	side: string;
	round: number;
	user: string;
	
}

interface IExelProductsRow {
	date: string;
	shift: number;
	round: number;
	styleSize: string;
	bars: number;
}

class ExportService {
	
  async ExportExel(
	  dates: string[],
  ) {
	  dates = sortStringArray(dates);
	  
	  const workbook = new ExcelJS.Workbook();
	  const defectsWorksheet = workbook.addWorksheet('Дефекты');
	  
	  defectsWorksheet.columns = [
		  { header: 'Дата', key: 'date', width: 10 },
		  { header: 'Смена', key: 'shift', width: 5 },
		  { header: 'Дефект', key: 'reject', width: 15 },
		  { header: 'Количество', key: 'count', width: 10 },
		  { header: '', key: 'empty', width: 5 },
		  { header: 'Стиль/Размер', key: 'styleSize', width: 15 },
		  { header: 'Положение', key: 'side', width: 5 },
		  { header: 'Цикл', key: 'round', width: 5 },
		  { header: 'Оператор', key: 'user', width: 30 },
	  ];
	  
	  const defects = await DefectService.GetAll({dates});
	  const defectsRows: IExelDefectsRow[] = [];
	  
	  for (const defect of defects) {
		  const product = await ProductService.Get({id: defect.productId});
		  
		  const style = await StyleService.Get({id: product?.styleId});
		  const size = await SizeService.Get({id: product?.sizeId});
		  
		  defectsRows.push({
			  date: defect.date,
			  shift: defect.shift,
			  reject: defect.alias,
			  count: defect.count,
			  styleSize: `${style?.value}-${size?.value}`,
			  side: defect.side,
			  round: defect.round,
			  user: defect.user
		  })
	  }
	  
	  defectsWorksheet.addRows(defectsRows);
	  
	  const productsWorksheet = workbook.addWorksheet('Продукты');
	  
	  productsWorksheet.columns = [
		  { header: 'Дата', key: 'date', width: 10 },
		  { header: 'Смена', key: 'shift', width: 5 },
		  { header: 'Цикл', key: 'round', width: 15 },
		  { header: 'Стиль/Размер', key: 'styleSize', width: 10 },
		  { header: 'Балки', key: 'bars', width: 5 },
	  ];
	  
	  const products = await ProductService.GetAll({date: dates});
	  const productsRows: IExelProductsRow[] = [];
	  
	  for (const product of products) {
		  
		  const style = await StyleService.Get({id: product?.styleId});
		  const size = await SizeService.Get({id: product?.sizeId});
		  const shift = await ShiftService.Get({id: product?.shiftId});
		  const round = await roundService.Get({id: product?.roundId});
		  
		  productsRows.push({
			  date: formatDate(product.date),
			  shift: shift!.value,
			  round: round!.value,
			  styleSize: `${style?.value}-${size?.value}`,
			  bars: product.bars
		  })
	  }
	  
	  productsWorksheet.addRows(productsRows);
	  
	  return workbook;
  }
  
}

export default new ExportService();