import {
	shortMonths, months, getShiftedNMonths, getShiftedMonthsForNYear, getLabel,
} from './graphHelper';

function randomBetween(min, max) {
	return Math.floor(
		Math.random() * (max - min) + min,
	);
}

function randomColor() {
	return `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)}, ${randomBetween(0, 255)})`;
}

function randomNColor(n) {
	const arr = new Array(n);
	for (let i = 0; i < n; i += 1) { arr[i] = randomColor(); }
	return arr;
}

function numberToMonth(n) {
	return months[n];
}

function mapDictiornayKeyNumberToMonthString(dictionary, timePeriod = 12) {
	const newDictionary = {};

	for (const monthNumber in dictionary) {
		if (dictionary[monthNumber] !== undefined) {
			const month = numberToMonth(monthNumber, timePeriod);
			newDictionary[month] = dictionary[monthNumber];
		}
	}

	return newDictionary;
}

function generateMonthYearForPeriodInMonth(monthsPeriod, startingDate = new Date()) {
	const arr = [];
	const startingYear = startingDate.getFullYear();
	const startingMonth = startingDate.getMonth();

	let currentMonth = startingMonth;
	let currentYear = startingYear;

	for (let i = 0; i < monthsPeriod; i += 1) {
		arr.push({ month: currentMonth, year: currentYear });

		currentMonth -= 1;
		if (currentMonth < 0) {
			// I mesi vengono calcolati da 0 a 11, quindi l'11 è dicembre e 0 è gennaio
			currentMonth = 11;
			currentYear -= 1;
		}
	}

	console.log(arr);

	return arr;
}

function generateMonthYearForPeriodInYear(yearsPeriod, startingDate = new Date()) {
	return generateMonthYearForPeriodInMonth(yearsPeriod * 12, startingDate);
}

function generateMonthYearForPeriod(periodString, startingDate = new Date()) {
	const [value, periodType] = periodString.split('-');

	if (periodType === 'Y') {
		return generateMonthYearForPeriodInYear(value, startingDate).reverse();
	} if (periodType === 'M') {
		return generateMonthYearForPeriodInMonth(value, startingDate).reverse();
	}

	throw new Error(`Unknown period type: ${periodType}`);
}

function generateDateKeyForPeriod(periodString, startingDate = new Date()) {
	const arr = [];
	for (const { month, year } of generateMonthYearForPeriod(periodString, startingDate)) {
		const dateKey = `${numberToMonth(month)}-${year}`;
		arr.push(dateKey);
	}

	return arr;
}

export default {
	randomBetween,
	randomColor,
	randomNColor,
	mapDictiornayKeyNumberToMonthString,
	numberToMonth,
	generateMonthYearForPeriod,
	generateDateKeyForPeriod,
};
