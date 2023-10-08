import mongoose from "mongoose";

const schema = new mongoose.Schema({
	players: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],

	matchId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "Match id required"],
	},

	amount: {
		type: Number,
		require: [true, "amount required"],
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		require: [true, "User id required"],
	},

	paymentId: {
		type: String,
	},

	paymentStatus: {
		type: String,
		default: "Failed",
	},

	paymentTime: {
		type: Date,
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
