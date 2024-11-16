import {IColumn} from "../types/IColumn";
import ProductService from "./product.service";
import DefectService from "./defect.service";
import {ShiftInstance} from "../model/databaseModels/Shift";
import {RoundInstance} from "../model/databaseModels/Round";
import {SizeInstance} from "../model/databaseModels/Size";
import style, {StyleInstance} from "../model/databaseModels/Style";
import {RejectInstance} from "../model/databaseModels/Reject";
import RoundService from "./round.service";
import {parseDate} from "../utils/parseDate";
import {formatDate} from "../utils/formatDate";
import {it} from "node:test";


class AnalyticService {
	
	async getProductDefectsMatrix(
		rejects: RejectInstance[],
		styles: StyleInstance[],
		sizes: SizeInstance[],
		rounds: RoundInstance[],
		shifts: ShiftInstance[],
		dates: string[],
		hideColsWithEmptyBar: boolean = true,
	) {
		
		let data: number[][] = [[]];
		
		
		rejects.forEach((reject, i) => {
			data[i + 1] = [];
		});
		
		
		for(let shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
			for(let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
				
				let dataId = 0;
				for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
					for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
						
						const products = await ProductService.GetAll({
							styleId: styles[styleIndex]?.id,
							sizeId: sizes[sizeIndex]?.id,
							shiftId: shifts[shiftIndex]?.id,
							roundId: rounds[roundIndex]?.id,
							date: dates
						})
						
						let totalDefects = 0;
						for (let rejectIndex = 0; rejectIndex < rejects.length; rejectIndex++) {
							let totalProduct = 0;
							
							if (products.length) {
								for (let productIndex = 0; productIndex < products.length; productIndex++) {
									
									if (products[productIndex].bars !== 0) {
										const defects = await DefectService.GetAll({
											rejectId: rejects[rejectIndex].id,
											productsId: products[productIndex].id
										});
										totalProduct = defects.reduce((acc, defect) => acc + defect.count, 0);
										
										totalDefects += totalProduct;
									}
									
									if (typeof data[rejectIndex + 1][dataId] === 'undefined') {
										data[rejectIndex + 1].push(0);
									}
									
									data[rejectIndex + 1][dataId] += totalProduct;
								}
							} else {
								if (typeof data[rejectIndex + 1][dataId] === 'undefined') {
									data[rejectIndex + 1].push(0);
								}
							}
						}
						
						let totalBars = 0;
						for (let productIndex = 0; productIndex < products.length; productIndex++) {
							totalBars += products[productIndex].bars;
						}
						
						if (typeof data[0][dataId] === 'undefined') {
							data[0].push(0);
						}
						
						data[0][dataId] += totalBars * 10;
						
						dataId++;
					}
				}
			}
		}
		
		if (hideColsWithEmptyBar) {
			const length = data[0].length;
			for (let barId = length - 1; barId >= 0; barId--) {
				if (data[0][barId] === 0) {
					for (let rowId = 0; rowId < data.length; rowId++) {
						data[rowId].splice(barId, 1);
					}
				}
			}
		}
		
		
		return data;
	}
	
	calcTotalRow(data: number[][]) {
		const totalCol: number[] = [];
		
		const rowLength = data[1].length;
		
		//1 тк пропускаю балки
		for(let itemId = 0; itemId < rowLength; itemId ++){
			let total = 0;
			for(let colId = 1; colId < data.length; colId++) {
				total+= data[colId][itemId];
			}
			totalCol.push(total);
		}

		return totalCol;
	}
	
	calcPoretto(totalCol: number[], offset = 0) {
		const porettoCol: number[] = [];
		
		if(offset > 0) {
			totalCol.splice(0, offset);
		}
		
		const total = totalCol.reduce((acc, num) => acc + num, 0);
		
		for (let i = 0; i < totalCol.length; i++) {
			let amount = 0
			for (let j = i; j >= 0; j--) {
				amount += totalCol[j];
			}
			porettoCol.push(Number( (amount/total*100).toFixed(2) ));
		}
		
		return porettoCol;
	}
	
	calcRejectPercent(totalCol: number[]) {
		const percentCol: number[] = [];
		
		
		const dipedProduct = totalCol[0];
		
		for (let i = 0; i < totalCol.length; i++) {
			percentCol.push( Number((totalCol[i]/dipedProduct*100).toFixed(2)) );
		}
		
		return percentCol;
	}
	
	calcColTotal(data: number[][]) {
		const totalRow: number[] = [];
		
		for(let colId = 0; colId < data.length; colId++) {
			totalRow.push(data[colId].reduce((acc, num) => acc + num, 0));
		}
		return totalRow;
	}
	
	async getProductHeaders(
		styles: StyleInstance[],
		sizes: SizeInstance[],
		rounds: RoundInstance[],
		shifts: ShiftInstance[],
		dates: string[],
	){
		const header = new Set<string>();
		for(let shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
			for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
				for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
					for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
						
						const products = await ProductService.GetAll({
							styleId: styles[styleIndex]?.id,
							sizeId: sizes[sizeIndex]?.id,
							shiftId: shifts[shiftIndex]?.id,
							roundId: rounds[roundIndex]?.id,
							date: dates,
						})
						
						let isBarsDefine = false;
						
						if (products.length) {
							for (const product of products) {
								if (product.bars > 0) {
									isBarsDefine = true;
									break;
								}
							}
						}
						if (!isBarsDefine) {
							continue;
						}
						
						header.add(`${styles[styleIndex].value}-${sizes[sizeIndex].value}`)
					}
				}
			}
		}
		
		return Array.from(header);
	}
	
	async getDefectStat(
		rejectId: string,
		dates: string[]
	){
		const rounds = await RoundService.GetAll(true);
		const roundValues = rounds.map((round) => round.value);
		
		const defects = await DefectService.GetAll({ rejectId, dates });
		defects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		
		// Группируем данные по дате и раунду
		const groupedData = {};
		
		for(const item of defects) {
			const date = formatDate(new Date(item.date));
			//@ts-ignore
			if (!groupedData[date]) {
				//@ts-ignore
				groupedData[date] = {};
			}
			//@ts-ignore
			if (!groupedData[date][item.round]) {
				//@ts-ignore
				groupedData[date][item.round] = {
					left: {
						count: 0,
						bars: 0,
					},
					right: {
						count: 0,
						bars: 0,
					},
				};
			}
			//@ts-ignore
			groupedData[date][item.round][item.side].count += item.count;
			//@ts-ignore
			if(! groupedData[date][item.round][item.side]) {
				//@ts-ignore
				groupedData[date][item.round][item.side] = 0;
			}
			const products = await ProductService.GetAll({date: [formatDate(new Date(item.date))], roundId: item.roundId});
			let bars = 0;
			products.forEach(item => bars += item.bars);
			['left', 'right'].forEach(side => {
				//@ts-ignore
				groupedData[date][item.round][side].bars = bars;
			})
			
		}
		
		
		const resultData = { left: [], right: [] };
		const labels: string[] = [];
		for (const date in groupedData) {
			for(const round of roundValues) {
				//@ts-ignore
				if (!groupedData[date][round]) {
					//@ts-ignore
					groupedData[date][round] = {
						left: {
							count: 0,
							bars: 0,
						},
						right: {
							count: 0,
							bars: 0,
						},
					};
				}
				//@ts-ignore
				resultData.left.push(groupedData[date][round].left);
				//@ts-ignore
				resultData.right.push(groupedData[date][round].right);
				labels.push(`${date.split('.').slice(0, 2).join('.')} / ${round}`);
			}
		}
		
		return { data: resultData, labels };
	}
}

export default new AnalyticService();