import {Permission, Products, Round, Shift, Size, Style, User} from '../model';
import ApiError from '../exceptions/ApiError';
import StyleService from './style.service';
import SizeService from './size.service';
import {MAX_ROUNDS} from '../constants/constants';
import {omitUndefined} from '../utils/omitUndefined';
import ShiftService from './shift.service';
import round from '../model/databaseModels/Round';
import RoundService from './round.service';
import calcDataOffset from "../utils/calcDataOffset";
import {ProductDTO} from "../dtos/Product.dto";
import {ProductWithCountDTO} from "../dtos/ProductWithCount";
import {formatDate} from "../utils/formatDate";
import {Defects} from "../model/model";
import DefectService from "./defect.service";
import {parseDate} from "../utils/parseDate";
import {Op} from "sequelize";
import {getBetweenDates} from "../utils/getBetweenDates";

class ProductService {
  async Add(styleId: string, sizeId: string, shiftId: string, roundId: string, date: Date) {

    const style = await StyleService.Get({id: styleId});
    if(! style) {
      throw ApiError.Custom('STYLE_NOT_FOUND')
    }
    
    const size = await SizeService.Get({id: sizeId});
    if(! size) {
      throw ApiError.Custom('SIZE_NOT_FOUND')
    }
    
    const shift = await ShiftService.Get({id: shiftId});
    if(! shift) {
      throw ApiError.Custom('SHIFT_NOT_FOUND')
    }
    
    const round = await RoundService.Get({id: roundId});
    
    if(! round) {
      throw ApiError.Custom('ROUND_NOT_FOUND')
    }
    
    
    
    return await Products.create({date, bars: 0, styleId: style.id, sizeId: size.id, roundId: round.id, shiftId: shift.id})
  }
  
  async Get(options: {
    id?: string,
    styleId?: string,
    sizeId?: string,
    roundId?: string,
    shiftId?: string,
    round?: number,
    date?: Date
  }) {
    if(options.id) {
      return await Products.findOne({where: {id: options.id}});
    }
    return await Products.findOne({where: omitUndefined(options)})
  }
	
	async GetAll(options: {
		styleId?: string,
		sizeId?: string,
		roundId?: string,
		shiftId?: string,
		date?: string[]
	}) {
	  if(options.date) {
		  if(! options.date.length) {
			  delete options.date;
		  }
		  else if(options.date?.length === 1) {
			  //@ts-ignore
			  options.date = {[Op.between]: getBetweenDates(parseDate(options.date[0]) as Date, 1)};
		  }
		  else if(options.date?.length === 2) {
			  const startDate = parseDate(options.date[0]) as Date;
			  const endData = parseDate(options.date[1]) as Date;
			  endData.setDate(endData.getDate() + 1);
			  //@ts-ignore
			  options.date = {[Op.between]: [startDate, endData]};
		  }
	  }
		return await Products.findAll({where: omitUndefined(options)})
	}
	
	async GetAndCountAll(options: {
		styleId?: string,
		sizeId?: string,
		roundId?: string,
		shiftId?: string,
		date?: string
	}, limit: any, page: any) {
		const [newLimit, offset] = calcDataOffset(limit, page);
		
		const optionsToFind = omitUndefined(options);
		
		const parsedDate = parseDate(optionsToFind.date)
		if(!! parsedDate) {
			optionsToFind.date = {[Op.between]: getBetweenDates(parseDate(optionsToFind.date) as Date, 1)};
		}
		
		const products = await Products.findAndCountAll({
			where: optionsToFind,
			include: [
				{ model: Style, as: 'style' },
				{ model: Size, as: 'size' },
				{ model: Round, as: 'round' },
				{ model: Shift, as: 'shift' },
			],
			limit: newLimit, offset
		});
		
		const productDTOs = products.rows.map(async product => {
			const hasDefects = !! await DefectService.Get({productsId: product.id})
			// @ts-ignore
			return new ProductDTO(
				product.id,
				product.bars,
				formatDate(product.date),
				// @ts-ignore
				product.size?.dataValues?.value,
				// @ts-ignore
				product.style?.dataValues?.value,
				// @ts-ignore
				product.shift?.dataValues?.value,
				// @ts-ignore
				product.round?.dataValues?.value,
				hasDefects
			)
		});
		
		return new ProductWithCountDTO(await Promise.all(productDTOs), products.count);
	}
	
	async Update(productId: string, bars: number) {
	  const product = await this.Get({id: productId});
	  
	  if(! product) {
		  throw ApiError.Custom('PRODUCT_NOT_FOUND')
	  }
	  
	  product.bars = bars;
	  await product.save();
	  
	  return product;
	}
	
}

export default new ProductService();