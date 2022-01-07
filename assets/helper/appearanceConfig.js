import Helper from './helper';

const backgroundColor = [
	'rgba(255, 99, 132)',
	'rgba(255, 159, 64)',
	'rgba(255, 205, 86)',
	'rgba(75, 192, 192)',
	'rgba(54, 162, 235)',
	'rgba(153, 102, 255)',
	'rgba(201, 203, 207)',
	'rgba(0, 233, 255)',
	'rgba(0, 161, 255)',
	'rgba(255, 79, 190)',
];

/*
const backgroundColor = [
	'rgba(155, 50, 240)',
	'rgba(77, 207, 247)',
	'rgba(105, 224, 81)',
	'rgba(247, 204, 77)',
	'rgba(240, 64, 46)',
	'rgba(174, 5, 252)',
	'rgba(245, 67, 37)',
	'rgba(16, 109, 230)',
	'rgba(7, 255, 113)',
	'rgba(227, 245, 39)',
]; */

const borderColor = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
	'rgba(0, 233, 255)',
	'rgba(0, 161, 255)',
	'rgba(255, 79, 190)',
];

const categoryToColoMap = new Map();
const nonUsedBackgroundColor = [...backgroundColor];

function categoryToColor(category) {
	if (categoryToColoMap.has(category)) {
		return categoryToColoMap.get(category);
	}
	let color = '';
	if (nonUsedBackgroundColor.length === 0) {
		color = Helper.randomColor();
	} else {
		const index = Helper.randomBetween(0, nonUsedBackgroundColor.length - 1);
		color = nonUsedBackgroundColor[index];
		nonUsedBackgroundColor.splice(index, 1);
	}

	categoryToColoMap.set(category, color);
	return color;
}

export default {
	categoryToColor,
	backgroundColor,
	borderColor,
};
