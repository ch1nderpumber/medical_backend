/**
 * @typedef SignUpDTO
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} lastname.required
 * @property {string} patronymic.required
 * @property {string} password.required
 */

export class SignUpDTO{
  email: string;
  name: string;
  lastname: string;
  patronymic: string;
  password: string;

  constructor(
    email: string,
    password: string,
    name: string,
    lastname: string,
    patronymic: string
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.patronymic = patronymic;
  }

}