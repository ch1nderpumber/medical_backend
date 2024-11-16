export function convertDateToPostgresFormat(dateString?: string) {
	if(! dateString) {
		return null;
	}
	// Разделяем строку даты на день, месяц и год
	const [day, month, year] = dateString.split('.');
	
	// Формируем новую строку даты в формате yyyy.mm.dd
	const formattedDate = `${year}-${month}-${day}`;
	
	return formattedDate;
}