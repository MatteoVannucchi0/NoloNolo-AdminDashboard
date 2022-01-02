const doughnut = {
	categoryToColor: {
		Automobili: 'rgb(255, 0, 0)',
		Goielli: 'rgb(0,255,0)',
		default: 'rgb(255,255,0)',
	},
	getColorOfCategory(category) {
		return this.categoryToColor[category] ? this.categoryToColor[category] : this.categoryToColor.default;
	},
	hoverBorderColor: 'rgb(255,255,255)',
	hoverBorderWidth: 4,

};

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
const borderColor = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
];

export default {
	doughnut,
	backgroundColor,
	borderColor,
};
