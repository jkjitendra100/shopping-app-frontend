import mongoose from "mongoose";

const schema = new mongoose.Schema({
	matchId: {
		type: mongoose.Schema.Types.ObjectId,
		require: [true, "Match Id required"],
	},

	firstRankPrice: {
		type: Number,
		require: [true, "First rank price required"],
	},

	secondRankPrice: {
		type: Number,
		require: [true, "Second rank price required"],
	},

	thirdRankPrice: {
		type: Number,
		require: [true, "Third rank price required"],
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

export const contest = mongoose.model("Contest", schema);
