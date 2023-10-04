import { asyncAwaitError } from "../middlewares/error.js";
import { match } from "../models/match.js";
import ErrorHandler from "../utils/error.js";

export const newMatch = asyncAwaitError(async (req, res, next) => {
	const {
		team1Country,
		team2Country,
		team1Players,
		team2Players,
		matchTime,
		matchName,
		sportName,
		entryFee,
		maxSelectablePlayers,
	} = req.body;

	if (!team1Country)
		return next(new ErrorHandler("First team country name is required", 400));
	if (!team2Country)
		return next(new ErrorHandler("Second team country name is required", 400));
	if (team1Players?.length < 0)
		return next(new ErrorHandler("First team players are required", 400));
	if (team2Players?.length < 0)
		return next(new ErrorHandler("Second team players are required", 400));
	if (!matchTime) return next(new ErrorHandler("Match time is required", 400));
	if (!matchName) return next(new ErrorHandler("Match name is required", 400));
	if (!sportName) return next(new ErrorHandler("sport name is required", 400));
	if (!entryFee) return next(new ErrorHandler("Entry fee is required", 400));
	if (!maxSelectablePlayers)
		return next(
			new ErrorHandler("Maximum selectable players is required", 400)
		);

	const data = await match.create({
		team1Country,
		team2Country,
		team1Players,
		team2Players,
		matchTime,
		matchName,
		sportName,
		entryFee,
		maxSelectablePlayers,
	});

	res.status(201).json({
		success: true,
		message: "Match created successfully",
		data,
	});
});

export const getAllMatches = asyncAwaitError(async (req, res, next) => {
	const data = await match.find({});

	res.status(200).json({
		success: true,
		data: data,
	});
});

export const getMatchById = asyncAwaitError(async (req, res, next) => {
	const { id } = req.params;
	const data = await match.findById({ _id: id });

	res.status(200).json({
		success: true,
		data: data,
	});
});
