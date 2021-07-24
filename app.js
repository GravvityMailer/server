const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const ampCors = require("@ampproject/toolbox-cors");
const config = require("./src/config/config");

const privateKey = fs.readFileSync("ssl/gravvity.in.key", "utf8");
const certificate = fs.readFileSync("ssl/gravvity.in.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

// middlewares;
app.use(
	ampCors({
		verifyOrigin: false,
		email: true,
	})
);
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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const userRoutes = require("./src/routes/User.routes");
app.use("/api/v1/user", userRoutes);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const portHTTP = 8080;
const portHTTPS = 8443;
const env = config().env;

httpServer.listen(portHTTP, () =>
	console.log(`Server is running in ${env} on port ${portHTTP}`)
);

httpsServer.listen(portHTTPS, () =>
	console.log(`Server is running in ${env} on port ${portHTTPS}`)
);
