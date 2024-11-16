import ApiError from '../exceptions/ApiError';
import {Defects} from '../model/model';
import {Side} from '../model/types/Side';
import RejectService from './reject.service';
import ProductService from './product.service';
import {omitUndefined} from "../utils/omitUndefined";
import {parseDate} from "../utils/parseDate";
import {DefectDto} from "../dtos/Defect.dto";
import Sequelize from "../model/db";
import {QueryTypes} from "sequelize";
import {convertDateToPostgresFormat} from "../utils/convertDateToPostgresFormat";

class DefectService {
  async Add(
    rejectId: string,
    side: string,
    count: number,
    styleId: string,
    sizeId: string,
    roundId: string,
    shiftId: string,
    date: string,
    userId: string
  ) {
    const isRejectExist = !! await RejectService.Get({id: rejectId});
    
    if(! isRejectExist){
      throw ApiError.Custom('REJECT_INVALID');
    }
    
    if(side !== Side.Left && side !== Side.Right){
      throw ApiError.Custom('SIDE_INVALID');
    }
	
	const parsedDate = parseDate(date);
	  
    let product = await ProductService.Get({sizeId, styleId, roundId, shiftId, date: parsedDate as Date})
    
    if(! product) {
      product = await ProductService.Add(styleId, sizeId, shiftId, roundId, parsedDate as Date);
    }
	
	const defect = await this.Get({productsId: product.id, side, rejectId, userId})
	
	if(! defect) {
		return await Defects.create({productsId: product.id, count, side, rejectId, userId});
	}
	
	defect.count += count;
	await defect.save()
	
	return defect
  }
  
  async Get(options: {
	  id?: string;
	  side?: string,
	  userId?: string,
	  productsId?: string,
	  rejectId?: string
  }) {
	  return await Defects.findOne({where: omitUndefined(options)})
  }
	
	async GetAll(options: {
		side?: string,
		userId?: string,
		productsId?: string,
		rejectId?: string,
		shiftId?: string,
		dates?: string[]
	}) {
	  
		  if(options.dates){
			  //@ts-ignore
			  options.dates = options.dates.map(date => convertDateToPostgresFormat(date)).filter(Boolean);
		  }
		const { side, userId, productsId, rejectId, shiftId, dates } = options;
		
		let conditions = [];
		let replacements = {};
		
		if (side) {
			conditions.push('defects.side = :side');
			//@ts-ignore
			replacements.side = side;
		}
		
		if (userId) {
			conditions.push('defects."userId" = :userId');
			//@ts-ignore
			replacements.userId = userId;
		}
		
		if (productsId) {
			conditions.push('defects."productsId" = :productsId');
			//@ts-ignore
			replacements.productsId = productsId;
		}
		
		if (rejectId) {
			conditions.push('defects."rejectId" = :rejectId');
			//@ts-ignore
			replacements.rejectId = rejectId;
		}
		
		if (shiftId) {
			conditions.push('defects."shiftId" = :shiftId');
			//@ts-ignore
			replacements.shiftId = shiftId;
		}
		
		if (dates && dates.length > 0) {
			if (dates.length === 1) {
				conditions.push('DATE(products.date) = DATE(:date1)');
				//@ts-ignore
				replacements.date1 = dates[0];
			} else if (dates.length === 2) {
				conditions.push('DATE(products.date) BETWEEN DATE(:date1) AND DATE(:date2)');
				//@ts-ignore
				replacements.date1 = dates[0];
				//@ts-ignore
				replacements.date2 = dates[1];
			}
		}
		
		const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
		
		const sql = `
			SELECT defects.*, products.date, products.bars, users.name as username, users.lastname, users.patronymic, rejects.name, rejects.alias, shifts.value as shift, rounds.value as round, rounds.id as roundid, shifts.id as shiftid
			FROM defects
			JOIN products ON defects."productsId" = products.id
			JOIN users ON defects."userId" = users.id
			JOIN rejects ON defects."rejectId" = rejects.id
			JOIN shifts ON products."shiftId" = shifts.id
			JOIN rounds ON products."roundId" = rounds.id
			${whereClause}
		  `;
		
		const defects = await Sequelize.query(sql, {
			type: QueryTypes.SELECT,
			replacements
		});
		
		const defectDTOs = defects.map(async defect => {

			// @ts-ignore
			const userName = `${defect.lastname} ${defect.username} ${defect.patronymic}`;
			// @ts-ignore
			return new DefectDto(defect.id, defect.side, defect.count, defect.productsId, userName, defect.userId, defect.name as string, defect.alias, defect.rejectId, defect.shift, defect.shiftid, defect.round, defect.roundid, defect.bars, defect.date)
		})

		return await Promise.all(defectDTOs);
	}
	
	async Update(defectId: string, count: number) {
		const defect = await this.Get({id: defectId});
		
		if(! defect) {
			throw ApiError.Custom('DEFECT_NOT_FOUND')
		}
		
		defect.count = count;
		await defect.save();
		
		return defect;
	}
	
	async Delete(defectId: string) {
		const defect = await this.Get({id: defectId});
		
		if(! defect) {
			throw ApiError.Custom('DEFECT_NOT_FOUND')
		}
		
		await defect.destroy();
	}
}

export default new DefectService();