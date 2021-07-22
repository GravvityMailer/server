const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		coins: [
			{
				type: String,
				required: true,
			},
		],
		isSubscribed: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", Users);
