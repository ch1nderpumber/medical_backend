
/**
 * @typedef ProductDTO
 * @property {string} id.required
 * @property {number} bars.required
 * @property {string} date.required
 * @property {string} size.required
 * @property {string} style.required
 * @property {string} shift.required
 * @property {string} round.required
 * @property {boolean} hasDefects.required
 */



export class ProductDTO {
	id: string;
	bars: number;
	date: string;
	size: string;
	style: string;
	shift: number;
	round: number;
	hasDefects: boolean;
	
	constructor(
		id: string,
		bars: number,
		date: string,
		size: string,
		style: string,
		shift: number,
		round: number,
		hasDefects: boolean,
	) {
		this.id = id;
		this.bars = bars;
		this.date = date;
		this.size = size;
		this.style = style;
		this.shift = shift;
		this.round = round;
		this.hasDefects = hasDefects;
	}
	
}