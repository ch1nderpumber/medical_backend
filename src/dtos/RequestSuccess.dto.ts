/**
 * @typedef RequestSuccessDTO
 * @property {boolean} success.required
 */

export class RequestSuccessDTO{
  success: boolean;
  
  constructor(
    success: boolean
  ) {
    this.success = success;
  }
  
}