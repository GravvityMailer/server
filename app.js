const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./src/config/config");

const app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.enable("trust proxy"); //To log IP Address of the requests
app.use(
	logger(
		":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
	)
);

const DB_URI = config().db;
mongoose
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

const userRoutes = require("./src/routes/User.routes");
app.use("/api/v1/user", userRoutes);

const PORT = config().port;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
