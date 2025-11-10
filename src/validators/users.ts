import { checkSchema, ParamSchema } from "express-validator";
import { User } from "../models/User";

const id: ParamSchema = {
	in: ["params"],
	isInt: {
		errorMessage: "ID must be an integer.",
	},
	notEmpty: {
		errorMessage: "ID is required.",
	},
};

export const getUserValidator = checkSchema({
	id,
});

export const updateUserValidator = checkSchema({
	username: {
		in: ["body"],
		isString: true,
		optional: true,
		trim: true,
	},
	email: {
		in: ["body"],
		isEmail: {
			errorMessage: "Valid email is required.",
		},
		optional: true,
		normalizeEmail: true,
	},
	first_name: {
		in: ["body"],
		isString: true,
		optional: true,
		trim: true,
	},
	last_name: {
		in: ["body"],
		isString: true,
		optional: true,
		trim: true,
	},
});

export const deleteUserValidator = checkSchema({
	id,
});
