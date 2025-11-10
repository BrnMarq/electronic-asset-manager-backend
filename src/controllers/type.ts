import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Type from "../models/Type";

export const getTypes = async (_: Request, res: Response) => {
	try {
		const types = await Type.findAll();
		res.status(200).json(types);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getTypeById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const type = await Type.findByPk(id);
		if (!type) {
			return res.status(404).json({ message: "Type not found" });
		}
		res.status(200).json(type);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const createType = async (req: Request, res: Response) => {
	try {
		const { name, category, description } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const type = await Type.create({ name, category, description });
		res.status(201).json(type);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, category, description } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const type = await Type.findByPk(id);
		if (!type) {
			return res.status(404).json({ message: "Type not found" });
		}
		type.name = name ?? type.name;
		type.category = category ?? type.category;
		type.description = description ?? type.description;
		await type.save();
		res.status(200).json(type);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
