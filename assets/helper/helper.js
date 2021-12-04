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

function generateMonthYearForPeriodInMonth(monthsPeriod, endDate = new Date()) {
	const arr = [];
	const startingYear = endDate.getFullYear();
	const startingMonth = endDate.getMonth();

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

	return arr;
}

function generateMonthYearForPeriodInYear(yearsPeriod, endDate = new Date()) {
	return generateMonthYearForPeriodInMonth(yearsPeriod * 12, endDate);
}

function generateMonthYearForPeriod(periodString, endDate = new Date()) {
	const [value, periodType] = periodString.split('-');

	if (periodType === 'Y') {
		return generateMonthYearForPeriodInYear(value, endDate).reverse();
	} if (periodType === 'M') {
		return generateMonthYearForPeriodInMonth(value, endDate).reverse();
	}

	throw new Error(`Unknown period type: ${periodType}`);
}

/**
 * Genera un array di stringhe nel formato 'MESE-ANNO' mese per mese per tutto il periodo passato.
 * @constructor
 * @param {string} periodString - La stringa rappresentante il periodo da generare. Esempio '3-Y'.
 * @param {Date} startingDate - La data finale del periodo .
 */
function generateDateKeyForPeriod(periodString, endDate = new Date()) {
	const arr = [];
	for (const { month, year } of generateMonthYearForPeriod(periodString, endDate)) {
		const dateKey = `${numberToMonth(month)}-${year}`;
		arr.push(dateKey);
	}
	return arr;
}

/**
 * Genera un dizionario key-value dove la key sono delle stringhe nel formato {MESE-ANNO} dove MESE è il nome del mese e il
 * value è dato dalla somma dei value di tutti i rent in quello specifico mese e anno.
 * @constructor
 * @param {Array} rentals - I rentals da cui calcolare i value
 * @param {string} periodString - La stringa rappresentante il periodo da generare. Esempio '3-Y'.
 * @param {Function} processRentalFunc -- Funzione che prende un rent è restituisce una endDate, e un value
 * @param {Date} startingDate - La data finale del periodo .
 */
function rentalsToValueDictionary(rentals, periodString, processRentalFunc, startingDate = new Date()) {
	const dateToValue = new Map();

	for (const dateKey of generateDateKeyForPeriod(periodString, startingDate)) {
		dateToValue.set(dateKey, 0);
	}

	for (const rent of rentals) {
		const { endDate, value } = processRentalFunc(rent);

		const endMonth = numberToMonth(endDate.getMonth());
		const endYear = endDate.getFullYear();
		const dateKey = `${endMonth}-${endYear}`;

		if (dateToValue.has(dateKey)) {
			dateToValue.set(dateKey, dateToValue.get(dateKey) + value);
		}
	}

	return dateToValue;
}

export default {
	randomBetween,
	randomColor,
	randomNColor,
	mapDictiornayKeyNumberToMonthString,
	numberToMonth,
	generateMonthYearForPeriod,
	generateDateKeyForPeriod,
	rentalsToValueDictionary,
};
