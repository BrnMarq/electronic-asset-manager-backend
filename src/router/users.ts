import express from "express";
import {
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} from "../controllers/users";
import {
	getUserValidator,
	updateUserValidator,
	deleteUserValidator,
} from "../validators/users";
import { authenticatedMiddleware } from "../middlewares/authentication";

export default (router: express.Router) => {
	router.get("/users", authenticatedMiddleware, getUsers);
	router.get(
		"/users/:id",
		authenticatedMiddleware,
		getUserValidator,
		getUserById
	);
	router.patch(
		"/users/:id",
		authenticatedMiddleware,
		updateUserValidator,
		updateUser
	);
	router.delete(
		"/users/:id",
		authenticatedMiddleware,
		deleteUserValidator,
		deleteUser
	);
};
