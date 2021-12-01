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

export default {
	randomBetween,
	randomColor,
	randomNColor,
};
