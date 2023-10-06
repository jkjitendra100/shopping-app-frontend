import mongoose from "mongoose";

const schema = new mongoose.Schema({
	players: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],

	matchId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [false, "Match id required"],
	},

	amount: {
		type: Number,
		require: [true, "amount required"],
	},

	paymentStatus: {
		type: Boolean,
		default: false,
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		require: [false, "User id required"],
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

export const fantasy = mongoose.model("Fantasy", schema);
