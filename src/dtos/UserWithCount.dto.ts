import {UserDTO} from "./User.dto";

/**
 * @typedef UserWithoutIdDTO
 * @property {UserDTO.model} data.required
 * @property {number} count.required
 */


export class UserWithCountDTO {
	data: UserDTO[];
	count: number;
	
	constructor(
		users: UserDTO[],
		count: number,
	) {
		this.data = users;
		this.count = count;
	}
	
}