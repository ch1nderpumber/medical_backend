

/**
 * @typedef PermissionInputDTO
 * @property {string} userId.required
 * @property {string} permissionId.required
 */

/**
 * @typedef PermissionDTO
 * @property {string} userId.required
 * @property {string} value.required
 * @property {string} name.required
 */


export class PermissionDTO{
  id: string;
  value: string;
  name: string;
  
  constructor(
    id: string,
    value: string,
    name: string
  ) {
    this.id = id;
    this.value = value;
    this.name = name;
  }
  
}