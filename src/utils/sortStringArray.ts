export function sortStringArray(arr: string[]) {
	return arr.sort((a, b) => a.localeCompare(b));
}