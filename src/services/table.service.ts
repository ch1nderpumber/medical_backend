import RejectService from './reject.service';
import {sortStringArray} from "../utils/sortStringArray";
import {IColumn} from "../types/IColumn";
import {StyleInstance} from "../model/databaseModels/Style";
import StyleService from "./style.service";
import SizeService from "./size.service";
import {SizeInstance} from "../model/databaseModels/Size";
import ShiftService from "./shift.service";
import {ShiftInstance} from "../model/databaseModels/Shift";
import AnalyticService from "./AnalyticService";
import {deepCopy} from "../utils/deepCopy";
import {Order, sortMatrix} from "../utils/sortMatrix";
import {RoundInstance} from "../model/databaseModels/Round";
import RoundService from "./round.service";

type IMatrix = {[key: number]: {[key: number]: string | number}};

class TableService {
	
  async Defects(
	  styleIds: string[],
	  sizeIds: string[],
	  roundIds: string[],
	  shiftIds: string[],
	  dates: string[],
  ) {
   
	  styleIds = sortStringArray(styleIds);
	  sizeIds = sortStringArray(sizeIds);
	  roundIds = sortStringArray(roundIds);
	  shiftIds = sortStringArray(shiftIds);
	  dates = sortStringArray(dates);
	  
	  
	  const rejects = await RejectService.GetAll();
	  const rejectLabels = rejects.map(reject => reject.name);
	  
	  
	  let shifts: (ShiftInstance | null)[] = [];
	  let sizes: (SizeInstance | null)[] = [];
	  let styles: (StyleInstance | null)[] = [];
	  let rounds: (RoundInstance | null)[] = [];
	  
	  // START: GET SIZES, SHIFTS, STYLE --->
	  if(styleIds.length > 0) {
		  const stylesPromise = styleIds.map(async styleId =>
			  await StyleService.Get({id: styleId}));
		  // @ts-ignore
		  styles = (await Promise.all(stylesPromise)).map(style => style?.dataValues);
	  }
	  else {
		  styles = await StyleService.GetAll(true)
	  }
	  
	  
	  if(sizeIds.length > 0) {
		  const sizesPromise = sizeIds.map(async sizeId =>
			  await SizeService.Get({id: sizeId}));
		  sizes = await Promise.all(sizesPromise);
	  }
	  else {
		  sizes = await SizeService.GetAll(true)
	  }
	  
	  if(shiftIds.length > 0) {
		  const shiftsPromise = shiftIds.map(async shiftId =>
			  await ShiftService.Get({id: shiftId}));
		  shifts = await Promise.all(shiftsPromise);
	  }
	  else {
		  shifts = await ShiftService.GetAll(true)
	  }
	  
	  if(roundIds.length > 0) {
		  const roundsPromise = roundIds.map(async roundId =>
			  await RoundService.Get({id: roundId}));
		  rounds = await Promise.all(roundsPromise);
	  }
	  else {
		  rounds = await RoundService.GetAll(true)
	  }
	  
	  // END: GET SIZES, SHIFTS, STYLE, ROUNDS --->
	  
	  let dataMatrixWithBars = await AnalyticService.getProductDefectsMatrix(rejects, styles as StyleInstance[], sizes as SizeInstance[], rounds as RoundInstance[], shifts as ShiftInstance[], dates);
	  const productLabels = await AnalyticService.getProductHeaders(styles as StyleInstance[], sizes as SizeInstance[], rounds as RoundInstance[], shifts as ShiftInstance[], dates);
	  
	  let colTotal = AnalyticService.calcColTotal(deepCopy(dataMatrixWithBars));
	  for(let i = 0; i < dataMatrixWithBars.length; i++) {
		  dataMatrixWithBars[i].push(colTotal[i]);
	  }
	  
	  
	  const colPercents = AnalyticService.calcRejectPercent(deepCopy(colTotal));
	  
	  for(let i = 0; i < dataMatrixWithBars.length; i++) {
		  dataMatrixWithBars[i].push(colPercents[i]);
	  }
	  
	  let onlyBars = dataMatrixWithBars.splice(0, 1);
	  const totalBars = colTotal[0];
	  colTotal.splice(0, 1);
	  
	  sortMatrix(dataMatrixWithBars, Order.DESC, rejectLabels, colTotal, colPercents);
	  colTotal = [totalBars, ...colTotal];
	  dataMatrixWithBars = [...onlyBars, ...dataMatrixWithBars]
	  
	  
	  const porettoCol = AnalyticService.calcPoretto(deepCopy(colTotal), 1);
	  
	  for(let i = 1; i < dataMatrixWithBars.length; i++) {
		  dataMatrixWithBars[i].push(porettoCol[i -1]);
	  }
	  
	  const rowTotal = AnalyticService.calcTotalRow(deepCopy(dataMatrixWithBars))
	  
	  rowTotal[rowTotal.length -2] = Number(rowTotal[rowTotal.length -2].toFixed(2)) || 0;
	  
	  dataMatrixWithBars.push(rowTotal);
	  
	  const tableDataLabels = ['Количество продукции', ...rejectLabels, 'Всего дефектов, полупары'];
	  
	  //удаляю процент порето из total
	  dataMatrixWithBars[dataMatrixWithBars.length - 1].splice(dataMatrixWithBars[dataMatrixWithBars.length - 1].length -1 ,1);
	  
	  tableDataLabels.forEach((item, i) => {
		  //@ts-ignore
		  dataMatrixWithBars[i].unshift(item);
	  })
	  
	  const totalRejects = dataMatrixWithBars[dataMatrixWithBars.length-1][dataMatrixWithBars[dataMatrixWithBars.length-1].length -2];
	  
	  const defectsLevel = Number(totalRejects === 0 || totalBars == 0 ? 0 : (totalRejects/ totalBars * 100).toFixed(2));
	  dataMatrixWithBars[dataMatrixWithBars.length -1][dataMatrixWithBars[dataMatrixWithBars.length -1].length -1] = defectsLevel;
		 
	  const tableData = dataMatrixWithBars.map((row => {
		  let data = {};
		  row.forEach((item, i) => {
			  //@ts-ignore
			  data[i] = item;
		  })
		  return data;
	  }))
	  
	  const mainCols: IColumn[] = [
		  {
			  title: 'Перечень дефектов / Стиль-Размер',
			  key: '0',
			  dataIndex: '0',
		  }
	  ];
	  
	  productLabels.forEach(label => mainCols.push({
		  title: label,
		  key: (mainCols.length) + '',
		  dataIndex: (mainCols.length) + '',
	  }));
	  
	  ['Всего дефектов, полупары', 'Всего дефектов, %', 'Комулятивный процент дефектов'].forEach(label => mainCols.push({
		  title: label,
		  key: (mainCols.length) + '',
		  dataIndex: (mainCols.length) + '',
	  }));
	  
	  const cols: IColumn[] = [{
		  title: `Уровень дефектов: ${defectsLevel}%`,
		  children: mainCols
	  }]
	  
	  return {cols, data: tableData}
  }
}

export default new TableService();