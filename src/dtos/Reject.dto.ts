/**
 * @typedef RejectInputDTO
 * @property {string} name.required
 */

/**
 * @typedef RejectDTO
 * @property {string} id.required
 * @property {string} name.required
 * @property {string} alias.required
 * @property {boolean} active.required
 * @property {number} key.required
 */

export class RejectDTO{
  id: string;
  name: string;
  alias: string;
  active: boolean;
  key: number;
  
  constructor(
    id: string,
    name: string,
	alias: string,
    active: boolean,
	key: number
  ) {
    this.id = id;
    this.name = name;
	this.alias = alias;
    this.active = active;
	this.key = key;
  }
}