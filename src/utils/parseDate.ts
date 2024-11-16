export function parseDate(dateString: string) {
	if(!dateString) {
		return null;
	}
	const [day, month, year] = dateString.split('.');
	
	if(! day || !month || !year) {
		return null;
	}
	return new Date(`${year}-${month}-${day}`);
}