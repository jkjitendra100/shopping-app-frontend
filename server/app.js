import express from "express";
import dotenv from "dotenv";
import user from "./routes/user.js";
import player from "./routes/player.js";
import Bating from "./routes/bating.js";
import PhoneAuth from "./routes/phoneAuth.js";
import Fantasy from "./routes/fantasy.js";
import Match from "./routes/match.js";
import Contest from "./routes/contest.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "./data/config.env" });

export const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		// credentials: true,
		// methods: ["GET", "POST", "PUT", "DELETE"],
		// origin: [
		// 	process.env.FRONTEND_URL_1,
		// 	process.env.FRONTEND_URL_2,
		// 	process.env.FRONTEND_URL_3,
		// ],
		origin: "*",
	})
);

app.get("/", (req, res) => {
	res.send("Default Route");
});

app.use("/api/v1/user", user);
app.use("/api/v1/player", player);
app.use("/api/v1/bating", Bating);
app.use("/api/v1/auth", PhoneAuth);
app.use("/api/v1/fantasy", Fantasy);
app.use("/api/v1/match", Match);
app.use("/api/v1/contest", Contest);

// Error middleware
app.use(errorMiddleware);
