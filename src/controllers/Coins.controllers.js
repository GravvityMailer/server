const acceptedCoins = require("./../utils/AcceptedCoins");

const fetchAcceptedCoins = (req, res, next) => {
	return res.status(200).json({ message: acceptedCoins });
};

module.exports = { fetchAcceptedCoins };
