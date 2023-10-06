import mongoose from "mongoose";

const schema = new mongoose.Schema({
	amount: {
		type: Number,
		required: [true, "amount required"],
	},

	client_secret: {
		type: String,
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "User id required"],
	},

	fantasyId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "Fantasy id required"],
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const Payment = mongoose.model("Payment", schema);
