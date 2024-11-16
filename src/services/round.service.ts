import {Round, Shift} from '../model';
import ApiError from '../exceptions/ApiError';

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
		
		return await  Round.findOne(searchParams)
	}
	
	async GetAll(full = true){
		if(full) {
			return await Round.findAll();
		}
		else {
			return await Round.findAll({where: {active: true}});
		}
	}
  
  async Update(id: string, value: number, active: boolean){
    const round = await this.Get({id});
    
    if(! round) {
      throw ApiError.Custom('ROUND_INVALID');
    }
	  
	  if(value !== round.value) {
		  const isRoundExists = !! await this.Get({value})
		  
		  if(isRoundExists) {
			  throw ApiError.Custom('ROUND_ALREADY_EXISTS');
		  }
	  }
    
    round.value = value;
	round.active = active;
    await round.save();
    
    return round;
  }
  
  async Create(value: number){
    const isRoundExists = !! await this.Get({value})
   
    if(isRoundExists) {
      throw ApiError.Custom('ROUND_ALREADY_EXISTS');
    }
    
    return await Round.create({value});
  }
}

export default new RoundService();