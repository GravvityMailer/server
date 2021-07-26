const acceptedCoins = require("./AcceptedCoins");

function areCoinsValid(coinsArray) {
	if (!Array.isArray(coinsArray) || coinsArray.length === 0) return false;

	let coins = coinsArray.map((coin) => {
		return coin.toLowerCase();
	});

	coins = [...new Set(coins)];

	let validCoins = acceptedCoins.map((coin) => {
		return coin.symbol.toLowerCase();
	});
	let result = coins.every((coin) => {
		return validCoins.includes(coin);
	});

	if (result === true) return coins;
	else return false;
}

module.exports = areCoinsValid;
