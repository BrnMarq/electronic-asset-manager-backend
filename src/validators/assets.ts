import { checkSchema } from "express-validator";
import Location from "../models/Location";
import Type from "../models/Type";
import User from "../models/User";

export const createAssetValidator = checkSchema({
	name: {
		in: ["body"],
		isString: {
			errorMessage: "Name must be a string.",
		},
		notEmpty: {
			errorMessage: "Name is required.",
		},
	},
	serial_number: {
		in: ["body"],
		isInt: {
			errorMessage: "Serial number must be an integer.",
		},
		notEmpty: {
			errorMessage: "Serial number is required.",
		},
	},
	type_id: {
		in: ["body"],
		isInt: {
			errorMessage: "Type ID must be an integer.",
		},
		notEmpty: {
			errorMessage: "Type ID is required.",
		},
		custom: {
			options: async (value) => {
				const type = await Type.findByPk(value);
				if (!type) return Promise.reject("Type ID does not exist.");
			},
		},
	},
	description: {
		in: ["body"],
		isString: true,
		optional: { options: { nullable: true } },
	},
	responsible_id: {
		in: ["body"],
		isInt: {
			errorMessage: "Responsible ID must be an integer.",
		},
		notEmpty: {
			errorMessage: "Responsible ID is required.",
		},
		custom: {
			options: async (value) => {
				const user = await User.findByPk(value);
				if (!user) return Promise.reject("Responsible ID does not exist.");
			},
		},
	},
	location_id: {
		in: ["body"],
		isInt: {
			errorMessage: "Location ID must be an integer.",
		},
		notEmpty: {
			errorMessage: "Location ID is required.",
		},
		custom: {
			options: async (value) => {
				const location = await Location.findByPk(value);
				if (!location) return Promise.reject("Location ID does not exist.");
			},
		},
	},
	status: {
		in: ["body"],
		isString: {
			errorMessage: "Status must be a string.",
		},
		notEmpty: {
			errorMessage: "Status is required.",
		},
	},
	cost: {
		in: ["body"],
		isFloat: {
			errorMessage: "Cost must be a number.",
		},
		notEmpty: {
			errorMessage: "Cost is required.",
		},
	},
	acquisition_date: {
		in: ["body"],
		isISO8601: {
			errorMessage: "Acquisition date must be a valid date.",
		},
		notEmpty: {
			errorMessage: "Acquisition date is required.",
		},
	},
});

export const deleteAssetValidator = checkSchema({
	id: {
		in: ["params"],
		isInt: {
			errorMessage: "ID must be an integer.",
		},
		notEmpty: {
			errorMessage: "ID is required.",
		},
	},
});
