const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	'August', 'September', 'October', 'November', 'December'];

// eslint-disable-next-line no-unused-vars
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function between(min, max) {
	return Math.floor(
		Math.random() * (max - min) + min,
	);
}

function fillData(index) {
	const data = {};
	data.label = `Linea-${index}`;
	data.data = [];

	for (let i = 0; i < months.length; i += 1) {
		const x = between(0, 20);
		const y = between(0, 10);
		data.data.push({
			x,
			y,
		});
	}
	return data;
}

const numberOfData = 3;
const graphData = [];
for (let i = 0; i < numberOfData; i += 1) {
	graphData[i] = fillData(i);
}

const graphOption = {
	borderColor: '#3e95cd',
	fill: false,
	smooth: false,
};

const graph = {
	graphData,
	graphOption,
};

export { months, shortMonths, graph };
