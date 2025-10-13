import express from "express";

import {
	registerValidator,
	loginValidator,
} from "../validators/authentication";

import { register, login } from "../controllers/authentication";

export default (router: express.Router) => {
	router.post("/auth/register", registerValidator, register);
	router.post("/auth/login", loginValidator, login);
};
