export const stringToArray = (str: string) => {
	if(!! str) return str.split(',');
	return [];
}