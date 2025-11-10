import express from "express";
import {
	getTypes,
	getTypeById,
	createType,
	updateType,
} from "../controllers/type";
import {
	getTypeValidator,
	createTypeValidator,
	updateTypeValidator,
} from "../validators/type";
import { authenticatedMiddleware } from "../middlewares/authentication";

export default (router: express.Router) => {
	router.get("/types", authenticatedMiddleware, getTypes);
	router.get(
		"/types/:id",
		authenticatedMiddleware,
		getTypeValidator,
		getTypeById
	);
	router.post(
		"/types",
		authenticatedMiddleware,
		createTypeValidator,
		createType
	);
	router.patch(
		"/types/:id",
		authenticatedMiddleware,
		updateTypeValidator,
		updateType
	);
};
