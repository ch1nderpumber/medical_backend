/**
 * @typedef SizeInputDTO
 * @property {string} value.required
 */

/**
 * @typedef SizeDTO
 * @property {string} id.required
 * @property {string} value.required
 * @property {boolean} active.required
 */

export class SizeDTO{
  id: string;
  value: string;
  active: boolean;
  
  constructor(
    id: string,
    value: string,
    active: boolean
  ) {
    this.id = id;
    this.value = value;
    this.active = active;
  }
  
}