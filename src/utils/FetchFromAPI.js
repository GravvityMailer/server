const fetch = require("node-fetch");
const config = require("../config/config");

const fetchFromAPI = async (coinsArray) => {
	try {
		// Converts ['BTC', 'ETH'] to BTC,ETH
		const queryParams = coinsArray.join();

		const apiUrl = config().apiUrl;
		const apiKey = config().apiKey;

		let response = await fetch(
			`${apiUrl}/v1/cryptocurrency/quotes/latest?symbol=${queryParams}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
					"X-CMC_PRO_API_KEY": apiKey,
				},
			}
		);

		let data = await response.json();
		if (data.status.error_code !== 0)
			return { error: "Invalid Request!", statusCode: 422 };
		//Clean data here and send back
		let returnArr = [];

		for (let key in data.data) {
			if (data.data.hasOwnProperty(key)) {
				returnArr.push(data.data[key]);
			}
		}

		returnArr = returnArr.map((i, j) => {
			let obj = {};
			obj.id = i.id;
			obj.name = i.name;
			obj.slug = i.slug;
			obj.price = i.quote.USD.price;
			return obj;
		});

		return { message: returnArr, statusCode: 200 };
	} catch (err) {
		return { error: "Internal server error", statusCode: 500 };
	}
};

module.exports = fetchFromAPI;
