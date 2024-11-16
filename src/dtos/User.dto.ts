
/**
 * @typedef UserDTO
 * @property {string} id.required
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} lastname.required
 * @property {string} patronymic.required
*/

/**
 * @typedef UserWithoutIdDTO
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} lastname.required
 * @property {string} patronymic.required
 */


export class UserDTO {
  id: string;
  email: string;
  name: string;
  lastname: string;
  patronymic: string;

  constructor(
    id: string,
    name: string,
    lastname: string,
    patronymic: string,
    email: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.patronymic = patronymic;
  }

}