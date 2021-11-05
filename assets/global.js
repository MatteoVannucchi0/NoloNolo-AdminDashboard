const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];

// eslint-disable-next-line no-unused-vars
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function between(min, max) {
	return Math.floor(
		Math.random() * (max - min) + min,
	);
}

const graphData = [];

for (let i = 0; i < months.length; i += 1) {
	const x = between(0, 20);
	const y = between(0, 10);
	graphData.push({
		label: `Punto-${i}`,
		x,
		y,
	});
}

console.log(graphData);

export { months, shortMonths, graphData };
