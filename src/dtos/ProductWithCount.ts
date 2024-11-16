import {ProductDTO} from "./Product.dto";

/**
 * @typedef ProductWithCountDTO
 * @property {ProductDTO.model} data.required
 * @property {number} count.required
 */


export class ProductWithCountDTO {
	data: ProductDTO[];
	count: number;
	
	constructor(
		products: ProductDTO[],
		count: number,
	) {
		this.data = products;
		this.count = count;
	}
	
}