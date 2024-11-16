import {Size, Style} from '../model';
import ApiError from '../exceptions/ApiError';

class StyleService {
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
		
		return await Style.findOne(searchParams)
	}
  
  async GetAll(full = true){
		if(full) {
			return await Style.findAll();
		}
		else {
			return await Style.findAll({where: {active: true}});
		}
  }
  
  async Update(id: string, value: string, active: boolean){
    const style = await this.Get({id});
    
    if(! style) {
      throw ApiError.Custom('STYLE_INVALID');
    }
	
	if(value !== style.value) {
		const isStyleExists = !! await this.Get({value})
		
		if(isStyleExists) {
			throw ApiError.Custom('STYLE_ALREADY_EXISTS');
		}
	}
    
    style.value = value;
	style.active = active;
    await style.save();
    
    return style;
  }
  
  async Create(value: string){
    const isStyleExists = !! await this.Get({value})
    
    if(isStyleExists) {
      throw ApiError.Custom('STYLE_ALREADY_EXISTS');
    }
    
    
    return await Style.create({value});
  }
}

export default new StyleService();