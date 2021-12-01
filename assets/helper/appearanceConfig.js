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
export default {
	doughnut,
};
