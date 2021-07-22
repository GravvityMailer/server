let acceptedCoins = [
	{
		name: "bitcoin",
		symbol: "btc",
	},
	{
		name: "ethereum",
		symbol: "eth",
	},
	{
		name: "cardano",
		symbol: "ada",
	},
	{
		name: "binance coin",
		symbol: "bnb",
	},
	{
		name: "dogecoin",
		symbol: "doge",
	},
	{
		name: "polkadot",
		symbol: "dot",
	},
	{
		name: "uniswap",
		symbol: "uni",
	},
	{
		name: "xrp",
		symbol: "xrp",
	},
	{
		name: "tether",
		symbol: "usdt",
	},
	{
		name: "usdc",
		symbol: "usdc",
	},
];

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
