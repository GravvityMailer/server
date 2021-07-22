const router = require("express").Router();
const {
	handleSubscribe,
	handleUnsubscribe,
	handleUserUpdate,
	fetchUserPrices,
	fetchUserDetails,
} = require("../controllers/User.controllers");

router.post("/", handleSubscribe);
router.delete("/:userId", handleUnsubscribe);
router.patch("/:userId", handleUserUpdate);
router.get("/:userId", fetchUserPrices);
router.get("/all/:timeSlot", fetchUserDetails);

module.exports = router;
