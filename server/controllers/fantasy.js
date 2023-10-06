import { asyncAwaitError } from "../middlewares/error.js";
import { Payment } from "../models/Payment.js";
import { fantasy } from "../models/fantasy.js";
import ErrorHandler from "../utils/error.js";
import { stripe } from "../server.js";

export const newFantasy = asyncAwaitError(async (req, res, next) => {
	const { players, matchId, userId, amount } = req.body;

	if (players?.length <= 0)
		return next(new ErrorHandler("Players required", 400));

	if (amount < 0) return next(new ErrorHandler("Amount required", 400));

	if (!userId) return next(new ErrorHandler("User Id required", 400));

	if (!matchId) return next(new ErrorHandler("Match Id required", 400));

	const data = await fantasy.create({
		players,
		matchId,
		userId,
		amount,
	});

	res.status(201).json({
		success: true,
		message: "Fantasy created successfully",
		data,
	});
});

export const processPayment = asyncAwaitError(async (req, res, next) => {
	const { amount, userId, fantasyId } = req.body;

	if (amount < 0) return next(new ErrorHandler("Amount required", 400));

	const { client_secret } = await stripe.paymentIntents.create({
		amount: Number(amount * 100),
		currency: "inr",
	});

	const data = await Payment.create({
		amount,
		client_secret,
		userId,
		fantasyId,
	});

	res.status(201).json({
		success: true,
		message: "Order successfully received",
		data,
		client_secret,
	});
});

export const allFantasies = asyncAwaitError(async (req, res, next) => {
	const data = await fantasy.find({});

	res.status(201).json({
		success: true,
		data,
	});
});

export const getSingleFantasy = asyncAwaitError(async (req, res, next) => {
	const { id } = req.params;

	const data = await fantasy.findById(id);

	if (data == null) return next(new ErrorHandler("Invalid fantasy id", 400));

	res.status(200).json({
		success: true,
		data,
	});
});
