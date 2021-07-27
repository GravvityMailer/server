const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
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

// DB Config
require("./src/config/dbConfig")();

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!!!!!");
});

const userRoutes = require("./src/routes/User.routes");
const coinRoutes = require("./src/routes/Coin.routes");
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/coin", coinRoutes);

// Port configuration
const environmentType = config().env;
const server =
	environmentType === "production"
		? https.createServer(credentials, app)
		: http.createServer(app);

const port = config().port;

server.listen(port, () =>
	console.log(
		`Server is running in ${environmentType} on port ${port} and ${process.env.ADITYA}`
	)
);
