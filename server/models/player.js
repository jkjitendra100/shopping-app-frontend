import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "Please enter name"],
	},

	game: {
		type: String,
		require: false,
	},

	team: {
		type: String,
		require: false,
	},

	country: {
		type: String,
		require: false,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},

	updatedAt: {
		type: Date,
		default: Date.now(),
	},
});

export const Player = mongoose.model("Player", schema);
