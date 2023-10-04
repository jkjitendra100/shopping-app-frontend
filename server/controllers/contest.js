import { asyncAwaitError } from "../middlewares/error.js";
import { contest } from "../models/contest.js";
import ErrorHandler from "../utils/error.js";

export const newContest = asyncAwaitError(async (req, res, next) => {
	const { matchId, firstRankPrice, secondRankPrice, thirdRankPrice } = req.body;

	if (!matchId) return next(new ErrorHandler("Match id is required", 404));
	if (!firstRankPrice)
		return next(new ErrorHandler("First rank price is required", 404));
	if (!secondRankPrice)
		return next(new ErrorHandler("Second rank price is required", 404));
	if (!thirdRankPrice)
		return next(new ErrorHandler("Third rank price is required", 404));

	const data = await contest.create({
		matchId,
		firstRankPrice,
		secondRankPrice,
		thirdRankPrice,
	});

	res.status(201).json({
		success: true,
		message: "Contest created successfully",
		data,
	});
});

export const getAllContests = asyncAwaitError(async (req, res, next) => {
	const data = await contest.find({});
	res.status(200).json({
		success: true,
		data,
	});
});

export const getSingleContest = asyncAwaitError(async (req, res, next) => {
	const { id } = req.params;
	if (!id) return next(new ErrorHandler("Contest id is required", 400));

	const data = await contest.findById({ _id: id });
	res.status(200).json({
		success: true,
		data,
	});
});
