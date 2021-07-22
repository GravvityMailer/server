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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", Users);
