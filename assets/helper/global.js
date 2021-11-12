import { months } from './graphHelper';

function between(min, max) {
	return Math.floor(
		Math.random() * (max - min) + min,
	);
}

function generateRandomData(length) {
	const data = [];
	for (let i = 0; i < length; i += 1) {
		data.push({ y: between(0, 100) });
	}
	return data;
}

function fillData(index) {
	const data = {};
	data.label = `Linea-${index}`;
	data.data = generateRandomData(months.length * 5);
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

// eslint-disable-next-line import/prefer-default-export
export { graph };
