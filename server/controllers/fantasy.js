import { asyncAwaitError } from "../middlewares/error.js";
import { Payment } from "../models/Payment.js";
import { fantasy } from "../models/fantasy.js";
import ErrorHandler from "../utils/error.js";
import { stripe } from "../server.js";
import { match } from "../models/match.js";

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
	const { amount, userId, fantasyId, matchId } = req.body;

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
		matchId,
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

export const updateFantasy = asyncAwaitError(async (req, res, next) => {
	const { id } = req.params;
	const { paymentId, paymentStatus } = req.body;

	if (!id) return next(new ErrorHandler("Fantasy id required", 400));
	if (!paymentId) return next(new ErrorHandler("Payment id required", 400));
	if (!paymentStatus)
		return next(new ErrorHandler("Payment status required", 400));

	const update = {
		$set: {
			paymentId,
			paymentStatus,
			paymentTime: Date.now(),
		},
	};

	const data = await fantasy.findByIdAndUpdate(id, update, { new: true });

	res.status(200).json({
		success: true,
		data,
	});
});

export const getMyFantasies = asyncAwaitError(async (req, res, next) => {
	const { userId } = req.params;

	const data = await fantasy.find({ userId: userId });

	const responseData = [];
	for (let i = 0; i < data.length; i++) {
		let fantasyData = data[i];
		let matchData = await match.findById(data[i]?.matchId);

		responseData?.push({ fantasyData, matchData });
	}

	if (data == null) return next(new ErrorHandler("Invalid fantasy id", 400));

	res.status(200).json({
		success: true,
		data: responseData,
	});
});
