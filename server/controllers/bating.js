import { asyncAwaitError } from "../middlewares/error.js";
import { Bating } from "../models/bating.js";
import ErrorHandler from "../utils/error.js";

// Make bating request
export const newBating = asyncAwaitError(async (req, res, next) => {
  const { players, totalPrice } = req.body;

  const batingReq = await Bating.create({
    players,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    message: "Bating request received",
    data: batingReq,
  });
});
