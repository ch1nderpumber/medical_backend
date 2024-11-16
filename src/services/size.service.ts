import {Round, Size, Style} from '../model';
import ApiError from '../exceptions/ApiError';

class SizeService {
	async Get(options: {id?: string, value?: string}, full = true){
		
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
		
		return await Size.findOne(searchParams)
	}
  
  async GetAll(full = true){
	  if(full) {
		  return await Size.findAll();
	  }
	  else {
		  return await Size.findAll({where: {active: true}});
	  }
  }
  
  async Update(id: string, value: string, active: boolean){
    const size = await this.Get({id});
    
    if(! size) {
      throw ApiError.Custom('SIZE_INVALID');
    }
	
	if(value !== size.value) {
		const isSizeExists = !! await this.Get({value})
		
		if(isSizeExists) {
			throw ApiError.Custom('SIZE_ALREADY_EXISTS');
		}
	}
    
    size.value = value;
	size.active = active;
    await size.save();
    
    return size;
  }
  
  async Create(value: string){
    const isSizeExists = !! await this.Get({value})
   
    if(isSizeExists) {
      throw ApiError.Custom('SIZE_ALREADY_EXISTS');
    }
    
    return await Size.create({value});
  }
}

export default new SizeService();