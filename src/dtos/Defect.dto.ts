
/**
 * @typedef DefectDto
 * @property {string} id.required
 * @property {string} side.required
 * @property {number} count.required
 * @property {string} user.required
 * @property {string} reject.required
 */



export class DefectDto {
	id: string;
	side: string;
	count: number;
	productId: string;
	user: string;
	userId: string;
	reject: string;
	alias: string;
	rejectId: string;
	shift: number;
	shiftId: string;
	round: number;
	roundId: string;
	bars: number;
	date: string;
	
	constructor(
		id: string,
		side: string,
		count: number,
		productId: string,
		user: string,
		userId: string,
		reject: string,
		alias: string,
		rejectId: string,
		shift: number,
		shiftId: string,
		round: number,
		roundId: string,
		bars: number,
		date: string,
	) {
		this.id = id;
		this.side = side;
		this.count = count;
		this.productId = productId;
		this.user = user;
		this.userId = userId;
		this.reject = reject;
		this.alias = alias;
		this.rejectId = rejectId;
		this.shift = shift;
		this.shiftId = shiftId;
		this.round = round;
		this.roundId = roundId;
		this.bars = bars;
		this.date = date;
	}
	
}