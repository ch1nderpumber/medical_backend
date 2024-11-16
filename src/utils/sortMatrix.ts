export enum Order {
	ASC = 'ASC',
	DESC = 'DESC',
}

export function sortMatrix(arrays: number[][], order: Order, ...repeatArrays: (number | string)[][]) {
	for (let i = 0; i < arrays.length - 1; i++) {
		for (let j = 0; j < arrays.length - 1 - i; j++) {
			let condition = order === Order.ASC
				? arrays[j][arrays[j].length - 1] > arrays[j + 1][arrays[j + 1].length - 1]
				: arrays[j][arrays[j].length - 1] < arrays[j + 1][arrays[j + 1].length - 1];
			
			if (condition) {
				let temp = arrays[j];
				arrays[j] = arrays[j + 1];
				arrays[j + 1] = temp;
				
				for(let x = 0; x < repeatArrays.length; x++) {
					let tempRepeat = repeatArrays[x][j];
					repeatArrays[x][j] = repeatArrays[x][j + 1];
					repeatArrays[x][j + 1] = tempRepeat;
				}
			}
		}
	}
}
