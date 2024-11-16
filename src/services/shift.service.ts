import {Round, Shift, Size} from '../model';
import ApiError from '../exceptions/ApiError';
import * as async_hooks from "node:async_hooks";

class RoundService {
	async Get(options: {id?: string, value?: number}, full = true){
		
		if(!options.id && !options.value){
			return null
		}
		const searchParams = {
			where: {}
		}
		
		if(options.id){
			//@ts-ignore
			searchParams.where.id = options.id
		}
		
		if(options.value){
			//@ts-ignore
			searchParams.where.value = options.value
		}
		
		if(! full) {
			//@ts-ignore
			searchParams.where.active = true;
		}
		
		return await  Shift.findOne(searchParams)
	}
  
  async GetAll(full = true){
	  if(full) {
		  return await Shift.findAll();
	  }
	  else {
		  return await Shift.findAll({where: {active: true}});
	  }
  }
  
  async Update(id: string, value: number, active: boolean){
    const shift = await this.Get({id});
    
    if(! shift) {
      throw ApiError.Custom('SHIFT_INVALID');
    }
	  
	  if(value !== shift.value) {
		  const isShiftExists = !! await this.Get({value})
		  
		  if(isShiftExists) {
			  throw ApiError.Custom('SHIFT_ALREADY_EXISTS');
		  }
	  }
    
    shift.value = value;
    shift.active = active;
    await shift.save();
    
    return shift;
  }
  
  async Create(value: number){
    const isShiftExists = !! await this.Get({value})
   
    if(isShiftExists) {
      throw ApiError.Custom('SHIFT_ALREADY_EXISTS');
    }
    
    return await Shift.create({value});
  }
}

export default new RoundService();