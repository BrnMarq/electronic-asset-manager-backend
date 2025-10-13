import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { random, hashPassword } from "../utils/hasher";
import User from "../models/User";
import config from "../config";

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const salt = random();
		const user = await User.create({
			username,
			email,
			salt,
			hashed_password: hashPassword(salt, password),
		});
		res.status(201).json(user.toJSON());
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { username, password } = req.body;
		const db_user = await User.findOne({ where: { username } });
		if (!db_user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const user = db_user.toJSON();
		const hashedInputPassword = hashPassword(user.salt, password);
		if (hashedInputPassword !== user.hashed_password) {
			return res.status(403).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			config.jwtSecret,
			{
				expiresIn: "1h",
			}
		);

		res.status(200).json({ token, user });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};
