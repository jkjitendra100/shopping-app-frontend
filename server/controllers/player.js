import { asyncAwaitError } from "../middlewares/error.js";
import { Player } from "../models/player.js";
import ErrorHandler from "../utils/error.js";

// Add new player
export const addPlayer = asyncAwaitError(async (req, res, next) => {
	const { name, game, team, country } = req.body;

	const player = await Player.create({
		name,
		game,
		team,
		country,
	});

	if (name.toString().trim().length <= 3)
		return next(new ErrorHandler("Name is too sort", 400));

	res.status(201).json({
		success: true,
		message: "Player added successfully",
		data: player,
	});
});

// Get all players
export const getAllPlayers = asyncAwaitError(async (req, res, next) => {
	const players = await Player.find({});

	res.status(200).json({
		success: true,
		data: players,
	});
});

export const getSinglePlayer = asyncAwaitError(async (req, res, next) => {
	const { id } = req.params;

	const data = await Player.findById(id);

	if (!data) return next(new ErrorHandler("Invalid Id", 400));

	res.status(200).json({
		success: true,
		data,
	});
});
