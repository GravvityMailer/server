const router = require("express").Router();
const {
	handleSubscribe,
	handleUnsubscribe,
	handleUserUpdate,
	fetchUserPrices,
	fetchUsers,
	fetchUser,
} = require("../controllers/User.controllers");

router.post("/subscribe", handleSubscribe);
router.patch("/unsubscribe/:userId", handleUnsubscribe);
router.patch("/:userId", handleUserUpdate);
router.get("/details/:userId", fetchUserPrices);
router.get("/lambda/all", fetchUsers);
router.get("/:userId", fetchUser);

module.exports = router;
