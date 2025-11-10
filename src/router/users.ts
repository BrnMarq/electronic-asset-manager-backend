import express from "express";
import {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/users";
import {
	getUserValidator,
	createUserValidator,
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
	router.post(
		"/users",
		authenticatedMiddleware,
		createUserValidator,
		createUser
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
