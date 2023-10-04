import mongoose from "mongoose";

const schema = new mongoose.Schema({
	players: [
		{
			playerId: mongoose.Schema.Types.ObjectId,
		},
	],

	totalPrice: {
		type: Number,
		require: [true, "Please enter price amount"],
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

export const Bating = mongoose.model("Bating", schema);
