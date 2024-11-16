import {Reject, Round} from '../model';
import ApiError from '../exceptions/ApiError';
import db from "../model/db";

const MAX_ACTIVE_ELEMENTS = 12;

class RejectService {
  async Get(options: {id?: string, name?: string, alias?: string}, full = true){
	  
	  if(!options.id && !options.name){
		  return null
	  }
	  const searchParams = {
		  where: {}
	  }
	  
	  if(options.id){
		  //@ts-ignore
		  searchParams.where.id = options.id
	  }
	  
	  if(options.name){
		  //@ts-ignore
		  searchParams.where.name = options.name
	  }
	  
	  if(options.alias){
		  //@ts-ignore
		  searchParams.where.alias = options.alias
	  }
	  
	  if(! full) {
		  //@ts-ignore
		  searchParams.where.active = true;
	  }
   
	  return await  Reject.findOne(searchParams)
  }
	
  async GetAll(full = true){
	  if(full) {
		  return await Reject.findAll({order: [['key', 'ASC']]});
	  }
	  else {
		  return await Reject.findAll({order: [['key', 'ASC']], where: {active: true}});
	  }
  }
  
  async Update(id: string, name: string, alias: string, active: boolean){
    const reject = await this.Get({id});
    
    if(! reject) {
      throw ApiError.Custom('REJECT_INVALID');
    }
	  
	if(name !== reject.name) {
	  const isRejectExists = !! await this.Get({name})
		  
	  if(isRejectExists) {
		  throw ApiError.Custom('REJECT_ALREADY_EXISTS');
	  }
	}
	  
	  if(alias !== reject.alias) {
		  const isRejectExists = !! await this.Get({alias})
		  
		  if(isRejectExists) {
			  throw ApiError.Custom('REJECT_ALREADY_EXISTS');
		  }
	  }
	
	if(active && active !== reject.active) {
		const rejects = await this.GetAll(true);
		const activeElements = rejects.filter(reject => reject.active).length;
		
		if(activeElements >= MAX_ACTIVE_ELEMENTS) {
			throw ApiError.Custom('LIMIT_REJECT_ACTIVE_ELEMENTS');
		}
	}
    
    reject.name = name;
	reject.active = active;
    await reject.save();
    
    return reject;
  }
  
  async Create(name: string, alias: string){
    const isRejectExists = !! await this.Get({name})

    if(isRejectExists) {
      throw ApiError.Custom('REJECT_ALREADY_EXISTS');
    }
	  
    const isRejectAliasExists = !! await this.Get({alias})
  
    if(isRejectAliasExists) {
 	  throw ApiError.Custom('REJECT_ALIAS_ALREADY_EXISTS');
    }
    
    
    return await Reject.create({name, alias});
  }
	
	async  Mover(activeId: number, overId: number) {
		const transaction = await db.transaction();
		
		try {
			const rejects = await Reject.findAll({
				order: [['key', 'ASC']],
				transaction
			});
			
			const dbActiveId = activeId + 1;
			const dbOverId = overId + 1;
			
			const activeItem = rejects.find(item => item.key === dbActiveId);
			const overItem = rejects.find(item => item.key === dbOverId);
			
			if (!activeItem || !overItem) {
				throw ApiError.Custom('INVALID_MOVE_KEYS');
			}
			
			const activeIndex = rejects.indexOf(activeItem);
			const overIndex = rejects.indexOf(overItem);
			
			rejects.splice(activeIndex, 1);
			rejects.splice(overIndex, 0, activeItem);
			
			for (let i = 0; i < rejects.length; i++) {
				rejects[i].key = i + 1;
				await rejects[i].save({ transaction });
			}
			
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
	
}

export default new RejectService();