/**
 * @typedef ShiftInputDTO
 * @property {number} value.required
 */

/**
 * @typedef ShiftDTO
 * @property {string} id.required
 * @property {number} value.required
 * @property {boolean} active.required
 */

export class ShiftDTO{
  id: string;
  value: number;
  active: boolean;
  
  constructor(
    id: string,
    value: number,
    active: boolean
  ) {
    this.id = id;
    this.value = value;
    this.active = active;
  }
  
}