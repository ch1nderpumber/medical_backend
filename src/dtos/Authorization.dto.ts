import {UserDTO} from './User.dto';
import {TokenDTO} from './Token.dto';

/**
 * @typedef AuthorizationDTO
 * @property {UserDTO.model} user.required
 * @property {TokenDTO.model} tokens.required
 */

export class AuthorizationDTO{
  user: UserDTO;
  tokens: TokenDTO;

  constructor(
    user: UserDTO,
    tokens: TokenDTO
  ) {
    this.user = user;
    this.tokens = tokens;
  }

}