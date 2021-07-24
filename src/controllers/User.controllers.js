const Users = require("../models/Users");
const isEmailValid = require("../utils/EmailValidator");
const fetchFromAPI = require("../utils/FetchFromAPI");
const areCoinsValid = require("../utils/ValidateCoins");

const inputValidator = (email, coins) => {
	if (!coins || !email) return { error: "Invalid Syntax" };

	const coinsLength = coins.length;

	if (!isEmailValid(email)) return { error: "Invalid Email!" };

	if (coinsLength < 1) return { error: "Select minimum one coin!" };

	if (coinsLength > 3) return { error: "Cannot select more than 3 coins!" };

	return { message: "valid" };
};

const handleSubscribe = async (req, res, next) => {
	let { email, coins } = req.body;

	const response = inputValidator(email, coins);
	if (response.error) return res.status(422).json(response);

	const validateCoins = areCoinsValid(coins);
	if (validateCoins === false)
		return res.status(422).json({ error: "Invalid Request" });
	else coins = validateCoins;

	try {
		const isUserExisting = await Users.findOne({ email });
		if (isUserExisting && isUserExisting.isSubscribed)
			return res.status(422).json({ error: "User already subscribed!" });
		else if (isUserExisting && !isUserExisting.isSubscribed) {
			const user = await Users.findByIdAndUpdate(isUserExisting._id, {
				isSubscribed: true,
				coins: coins,
			});

			if (!user) return res.status(422).json({ error: "Invalid Request!" });
			return res.status(200).json({ message: "User Subscribed!" });
		}
		const newUser = new Users({
			email,
			coins,
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
		const user = await Users.findByIdAndUpdate(id, {
			isSubscribed: false,
		});
		if (!user) return res.status(422).json({ error: "Invalid Request!" });
		return res.status(200).json({ message: "User Unsubscribed!" });
	} catch (err) {
		return res.status(500).json({ error: "Internal Server error!" });
	}
};

const fetchUserPrices = async (req, res, next) => {
	const ampSenderHeader = req.headers["amp-email-sender"];

	const id = req.params.userId;

	if (!id) return res.status(422).json({ error: "Userid not valid!" });

	try {
		const user = await Users.findById(id);
		if (!user) return res.status(422).json({ error: "Invalid Request!" });

		let coins = user.coins;
		let data = await fetchFromAPI(coins);
		if (data.error) {
			if (data.statusCode === 500)
				return res.status(500).json({ error: data.error });
			return res.status(422).json({ error: data.error });
		} else {
			res.status(200).json({ items: data.message });
		}
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

const fetchUser = async (req, res, next) => {
	const id = req.params.userId;

	if (!id) return res.status(422).json({ error: "Userid not valid!" });

	try {
		const user = await Users.findById(id);
		if (!user) return res.status(422).json({ error: "Invalid Request!" });
		return res.status(200).json({ message: user });
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

const handleUserUpdate = async (req, res, next) => {
	const id = req.params.userId;
	let { email, coins } = req.body;

	if (!id || !email || !coins)
		return res.status(422).json({ error: "Invalid Request!" });

	const response = inputValidator(email, coins);
	if (response.error) return res.status(422).json(response);

	const validateCoins = areCoinsValid(coins);
	if (validateCoins === false)
		return res.status(422).json({ error: "Invalid Request" });
	else coins = validateCoins;

	try {
		const user = await Users.findOneAndUpdate(
			{ _id: id, email: email },
			{
				coins,
			}
		);
		if (!user) return res.status(422).json({ error: "Invalid Request!" });
		return res.status(200).json({ message: "User Updated!" });
	} catch (err) {
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};

// For lambda function to check which users to send emails to
const fetchUsers = async (req, res, next) => {
	const authToken = req.headers.authorization;
	if (!authToken || authToken !== process.env.LAMBDA_AUTH_TOKEN)
		return res.status(422).json({ error: "Invalid Request!" });

	try {
		const users = await Users.find({ isSubscribed: true }, "_id email");
		if (users.length === 0)
			return res.status(404).json({ error: "No users found" });

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
	fetchUsers,
	fetchUser,
};
