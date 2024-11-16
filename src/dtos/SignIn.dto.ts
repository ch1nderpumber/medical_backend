/**
 * @typedef SignInDTO
 * @property {string} email.required
 * @property {string} password.required
 */

export class SignInDTO{
  email: string;
  password: string;

  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }

}