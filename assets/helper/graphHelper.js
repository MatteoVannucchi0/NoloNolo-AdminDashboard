/* eslint-disable no-param-reassign */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getLabel(monthsIndex, year) {
	return `${months[monthsIndex]}-${year}`;
}

function getShiftedMonthsOf({ endingYear, endingMonth, numberOfYears }) {
	endingYear = endingYear || new Date().getFullYear();
	endingMonth = endingMonth || new Date().getMonth();
	numberOfYears = numberOfYears || 1;
	const rearrangedMonths = [];

	if (numberOfYears > 1) {
		rearrangedMonths.push(...getShiftedMonthsOf({ endingYear: endingYear - 1, endingMonth, numberOfYears: numberOfYears - 1 }));
	}

	for (let i = 0; i < months.length; i += 1) {
		const index = (i + endingMonth) % months.length;
		if (i < 12 - endingMonth) {
			rearrangedMonths.push(getLabel(index, endingYear - 1));
		} else {
			rearrangedMonths.push(getLabel(index, endingYear));
		}
	}

	return rearrangedMonths;
}

function getShiftedMonthsForNYear(year) {
	const currentYear = (new Date().getFullYear());
	const currentMonth = (new Date().getMonth());

	return getShiftedMonthsOf({ endingYear: currentYear, endingMonth: currentMonth, numberOfYears: year });
}

function getShiftedNMonths(numberOfMonths) {
	const currentMonth = (new Date().getMonth());
	const currentYear = (new Date().getFullYear());

	const rearrangedMonths = [];
	for (let i = 0; i < numberOfMonths; i += 1) {
		let index = currentMonth - i - 1;
		let year = currentYear;
		if (index < 0) {
			index += 12;
			year -= 1;
		}

		rearrangedMonths.push(getLabel(index, year));
	}

	return rearrangedMonths.reverse();
}

export {
	shortMonths, months, getShiftedNMonths, getShiftedMonthsForNYear,
};
