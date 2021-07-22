const fetch = require("node-fetch");
const config = require("../config/config");

const fetchFromAPI = async (queryParams, coinArray) => {
	try {
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
