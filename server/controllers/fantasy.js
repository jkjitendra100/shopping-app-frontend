import { asyncAwaitError } from "../middlewares/error.js";
import { fantasy } from "../models/fantasy.js";
import ErrorHandler from "../utils/error.js";

export const newFantasy = asyncAwaitError(async (req, res, next) => {
	const { fantasyName, fantasyPrice, players, maxSelectablePlayers } = req.body;
	const data = await fantasy.create({
		fantasyName,
		fantasyPrice,
		maxSelectablePlayers,
		players,
	});

	if (fantasyName?.toString()?.trim()?.length <= 3)
		return next(new ErrorHandler("Fantasy name is too sort", 400));

	if (fantasyPrice <= 0)
		return next(new ErrorHandler("Please enter valid fantasy price", 400));

	if (maxSelectablePlayers <= 0)
		return next(
			new ErrorHandler("Please enter valid number of selectable players", 400)
		);

	if (maxSelectablePlayers > players.length)
		return next(
			new ErrorHandler(
				"The number of selectable players cannot be grater then entered players",
				400
			)
		);

	if (players?.length <= 0)
		return next(new ErrorHandler("Please select valid players", 400));

	res.status(201).json({
		success: true,
		message: "Fantasy created successfully",
		data,
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
