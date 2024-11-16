import {parseDate} from "./parseDate";

export const getBetweenDates = (date: Date, daysOffset: number) => {
	const toDate = new Date(date);
	toDate.setDate(toDate.getDate() + daysOffset);
	toDate.setTime(toDate.getTime() - 1);
	
	return [date, toDate]
}