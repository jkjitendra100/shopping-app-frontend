import { asyncAwaitError } from "../middlewares/error.js";

export const phoneAuth = asyncAwaitError(async (req, res, next) => {
  const { mobileNo } = req.body;


  // Mobile OTP request will be here

  res.status(200).json({
    success: true,
    message: "Logged in successful",
  });
});
