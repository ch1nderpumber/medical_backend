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


class ChartService {
	
  async DefectsPoretto(
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
	  
	  let dataMatrixWithBars = await AnalyticService.getProductDefectsMatrix(rejects, styles as StyleInstance[], sizes as SizeInstance[], rounds as RoundInstance[], shifts as ShiftInstance[], dates);
	  
	  let colTotal = AnalyticService.calcColTotal(deepCopy(dataMatrixWithBars));
	  for(let i = 0; i < dataMatrixWithBars.length; i++) {
		  dataMatrixWithBars[i].push(colTotal[i]);
	  }
	  
	  const colPercents = AnalyticService.calcRejectPercent(deepCopy(colTotal));
	  colPercents.splice(0, 1);
	  
	  for(let i = 0; i < colPercents.length; i++) {
		  dataMatrixWithBars[i + 1].push(colPercents[i]);
	  }
	  
	  let onlyBars = dataMatrixWithBars.splice(0, 1);
	  const totalBars = colTotal[0];
	  colTotal.splice(0, 1);
	  
	  sortMatrix(dataMatrixWithBars, Order.DESC, rejectLabels, colTotal, colPercents);
	  colTotal = [totalBars, ...colTotal];
	  dataMatrixWithBars = [...onlyBars, ...dataMatrixWithBars]
	  
	  const porettoCol = AnalyticService.calcPoretto(deepCopy(colTotal), 1);
	  
	  
	  
	  const defectsChart: {[key: string]: number} = {};
	  
	  rejectLabels.forEach((label, i) => {
		  defectsChart[label] = colPercents[i];
	  })
	  
	  return {labels: rejectLabels, data: colPercents, cumulativeData: porettoCol}
  }
  
  async DefectAnalysis(
	  rejectId: string,
	  dates: string[]
  ){
	  dates = sortStringArray(dates);
	  
	  return await AnalyticService.getDefectStat(rejectId, dates);
  }
	
	async DefectAnalysisHalfPair(
		rejectId: string,
		dates: string[]
	){
		dates = sortStringArray(dates);
	}
  
}

export default new ChartService();