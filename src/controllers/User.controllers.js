const Users = require("../models/Users");
const isEmailValid = require("../utils/EmailValidator");
const fetchFromAPI = require("../utils/FetchFromAPI");

const inputValidator = (email, coins, timeSlots) => {
	if (!coins || !timeSlots) return { error: "Invalid Syntax" };

	const coinsLength = coins.length;
	const timeSlotsLength = timeSlots.length;

	if (!email || !isEmailValid(email)) return { error: "Invalid Email!" };

	if (!coinsLength) return { error: "Select minimum one coin!" };

	if (coinsLength > 4) return { error: "Cannot select more than 4 coins!" };

	if (!timeSlotsLength) return { error: "Select minimum one timeslot!" };

	return { message: "valid" };
};

const handleSubscribe = async (req, res, next) => {
	const { email, coins, timeSlots } = req.body;

	let response = inputValidator(email, coins, timeSlots);
	if (response.error) return res.status(422).json(response);

	try {
		const isUserExisting = await Users.findOne({ email });
		if (isUserExisting)
			return res.status(422).json({ error: "User already exists!" });
		const newUser = new Users({
			email,
			coins,
			timeSlots,
		});
		try {
			let savedUser = await newUser.save();
			return res.status(200).json({ message: "User Subscribed!" });
		} catch (err) {
			return res.status(500).json({ error: "Internal Server Error!" });
		}
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

const handleUnsubscribe = async (req, res, next) => {
	const id = req.params.userId;

	if (!id) return res.status(422).json({ error: "Userid not valid!" });

	try {
		const user = await Users.findByIdAndRemove(id);
		if (!user) return res.status(422).json({ error: "Invalid Request!" });
		return res.status(200).json({ message: "User Unsubscribed!" });
	} catch (err) {
		return res.status(500).json({ error: "Internal Server error!" });
	}
};

const fetchUserPrices = async (req, res, next) => {
	const id = req.params.userId;

	if (!id) return res.status(422).json({ error: "Userid not valid!" });

	try {
		const user = await Users.findById(id);
		if (!user) return res.status(422).json({ error: "Invalid Request!" });

		let coins = user.coins;
		// Converts ['BTC', 'ETH'] to BTC,ETH
		let queryParams = coins.join();
		let data = await fetchFromAPI(queryParams, coins);
		if (data.error) {
			console.log(data.error);
		} else {
			console.log(data.message);
			res.json(data.message);
		}
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

const handleUserUpdate = async (req, res, next) => {};

// For lambda function to check which users to send emails to
const fetchUserDetails = async (req, res, next) => {
	let timeSlot = req.params.timeSlot;
	timeSlot = parseInt(timeSlot);

	try {
		const users = await Users.find({ timeSlots: timeSlot }, "_id email");
		if (users.length === 0)
			return res.status(404).json({ error: "No users with that timeslot" });

		return res.status(200).json({ message: users });
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

module.exports = {
	handleUserUpdate,
	handleSubscribe,
	handleUnsubscribe,
	fetchUserPrices,
	fetchUserDetails,
};

// TODO: Make config for test, prod db, api
// TODO: Check if the tokens selected are available
// TODO: Clean token names(Capital) and response objects(Nullify the non existing token objects)
