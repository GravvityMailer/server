const router = require("express").Router();
const { fetchAcceptedCoins } = require("../controllers/Coins.controllers");

router.get("/all", fetchAcceptedCoins);

module.exports = router;
