const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app2 = express();

const config = () => {
	switch (app2.get("env")) {
		case "development":
			return {
				db: process.env.DEV_DB_URI,
				apiUrl: "https://sandbox-api.coinmarketcap.com",
				apiKey: process.env.DEV_API_KEY,
				port: 8080,
				env: "development",
			};
		case "production":
			return {
				db: process.env.PROD_DB_URI,
				apiUrl: "https://pro-api.coinmarketcap.com",
				apiKey: process.env.PROD_API_KEY,
				port: process.env.PORT,
				env: "production",
			};
		default:
			return {
				db: process.env.DEV_DB_URI,
				apiUrl: "https://sandbox-api.coinmarketcap.com",
				apiKey: process.env.DEV_API_KEY,
				port: 8080,
				env: "development",
			};
	}
};

module.exports = config;
