
/**
 * @typedef EmailDTO
 * @property {string} email.required
 */

export class EmailDTO{
  email: string;
  
  constructor(
    email: string
  ) {
    this.email = email;
  }
  
}