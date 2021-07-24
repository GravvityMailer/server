const mongoose = require("mongoose");
const config = require("./config");

const DB_URI = config().db;

const dbConnect = async () => {
	await mongoose
		.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log("Connected to the database!");
		})
		.catch((err) => {
			console.log("Cannot connect to the database!", err);
			process.exit();
		});
};
module.exports = dbConnect;
