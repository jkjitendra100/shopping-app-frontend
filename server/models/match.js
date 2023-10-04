import mongoose from "mongoose";

const schema = new mongoose.Schema({
	team1Country: {
		type: String,
		require: [true, "First country name required"],
	},

	team2Country: {
		type: String,
		require: [true, "Second country name required"],
	},

	team1Players: [
		{
			playerId: {
				type: mongoose.Schema.Types.ObjectId,
				require: [true, "Player Id required"],
			},
		},
	],

	team2Players: [
		{
			playerId: {
				type: mongoose.Schema.Types.ObjectId,
				require: [true, "Player Id required"],
			},
		},
	],

	sportName: {
		type: String,
		require: [true, "Sport name required"],
	},

	matchName: {
		type: String,
		require: [true, "Sport name required"],
	},

	matchTime: {
		type: Number,
		require: [true, "Match time required"],
	},

	entryFee: {
		type: Number,
		require: [true, "Entry fee required"],
	},

	maxSelectablePlayers: {
		type: Number,
		require: [true, "Maximum selectable players for team is required"],
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

export const match = mongoose.model("Match", schema);
