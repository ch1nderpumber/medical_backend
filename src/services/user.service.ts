import bcrypt from 'bcrypt';
import {User} from '../model'
import {PASS_HASH_ROUNDS} from '../constants/constants';
import ApiError from '../exceptions/ApiError';
import {v4 as uuidv4} from 'uuid';
import calcDataOffset from '../utils/calcDataOffset';

class UserService {

  async Get(options: {
      id?: string,
      email?: string
}) {
    
    if(options.id) {
      return await User.findOne({ where: { id: options.id } });
    }
    
    if(options.email) {
      options.email = options.email.toLowerCase();
      return await User.findOne({ where: { email: options.email } });
    }
    
    return null;
  }
  
  async Remove(id: string) {
    const user = await this.Get({id});
    
    if(! user) {
      throw ApiError.Custom('USER_NOT_FOUND');
    }
    
    await user.destroy();
  }
  
  async GetAll(limit: any, page: any) {
  
    const [newLimit, offset] = calcDataOffset(limit, page);
    
    const users = await User.findAndCountAll({limit: newLimit, offset});

    return users;
  }

  async Create(email: string, name: string, lastname: string, patronymic: string, password: string) {
    email = email.toLowerCase();
    
    const isUserExists = !!await this.Get({email})
    
    if(isUserExists) {
      throw ApiError.Custom('USER_ALREADY_EXIST');
    }
    const hashPassword = await bcrypt.hash(password, PASS_HASH_ROUNDS);
    
    return await User.create({
      email,
      name,
      lastname,
      patronymic,
      password: hashPassword
    });
  }
  
  async Update(id: string, options: {email?: string, name?: string, lastname?: string, patronymic?: string, password?: string}) {
    
    const user = await this.Get({id});
    
    if(! user) {
      throw ApiError.Custom('USER_NOT_FOUND');
    }
    
    options.email = options.email || user.email;
    options.email = options.email.toLowerCase();
    options.name = options.name || user.name;
    options.lastname = options.lastname || user.lastname;
    options.patronymic = options.patronymic || user.patronymic;
    
    options.password = options.password ? await bcrypt.hash(options.password, PASS_HASH_ROUNDS) : user.password;
    
    user.email = options.email;
    user.name = options.name;
    user.lastname = options.lastname;
    user.patronymic = options.patronymic;
    user.password = options.password;
    
    await user.save();
    
    return user;
  }
  
  async generateResetHash(email: string){
    const user = await User.findOne({where: { email }});
    
    if(! user) {
      throw ApiError.Custom('USER_NOT_FOUND')
    }
    const hash =  uuidv4();
    user.passwordResetHash = hash;
    await user.save();
    
    return hash;
  }
  
  async resetPassword(hash: string, password: string){
    
    if(hash === null) {
      throw ApiError.Custom('USER_NOT_FOUND')
    }
    
    const user = await User.findOne({where: { passwordResetHash: hash }});
    
    if(! user) {
      throw ApiError.Custom('USER_NOT_FOUND')
    }
    
    const hashPassword = await bcrypt.hash(password, PASS_HASH_ROUNDS);
    user.password = hashPassword;
    user.passwordResetHash = null;
    await user.save();
    
    return user;
  }
  
}


export default new UserService();