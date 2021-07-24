const dotenv = require("dotenv");
dotenv.config();

const config = () => {
	switch (process.env.NODE_ENV) {
		case "development":
			return {
				db: process.env.DEV_DB_URI,
				apiUrl: "https://sandbox-api.coinmarketcap.com",
				apiKey: process.env.DEV_API_KEY,
				env: "development",
			};
		case "production":
			return {
				db: process.env.PROD_DB_URI,
				apiUrl: "https://pro-api.coinmarketcap.com",
				apiKey: process.env.PROD_API_KEY,
				env: "production",
			};
		default:
			return {
				db: process.env.DEV_DB_URI,
				apiUrl: "https://sandbox-api.coinmarketcap.com",
				apiKey: process.env.DEV_API_KEY,
				env: "development",
			};
	}
};

module.exports = config;
