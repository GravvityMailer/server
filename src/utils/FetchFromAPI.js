const fetch = require("node-fetch");

const fetchFromAPI = async (queryParams, coinArray) => {
	try {
		let response = await fetch(
			`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${queryParams}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
					"X-CMC_PRO_API_KEY": "6e40f7d7-ff4c-4a1e-b27b-57eb247ed256",
				},
			}
		);

		let data = await response.json();
		if (data.status.error_code !== 0) return { error: "Invalid Request!" };
		//Clean data here and send back
		let returnArr = [];

		for (let key in data.data) {
			if (data.data.hasOwnProperty(key)) {
				returnArr.push(data.data[key]);
			}
		}

		return { message: returnArr };
	} catch (err) {
		return { error: err };
	}
};

module.exports = fetchFromAPI;
