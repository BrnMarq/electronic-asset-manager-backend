import express from "express";
import { validationResult } from "express-validator";
import { Asset } from "../models/Asset";

export const createAsset = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const {
			name,
			serial_number,
			type_id,
			description,
			responsible_id,
			location_id,
			status,
			cost,
			acquisition_date,
		} = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.create({
			name,
			serial_number,
			type_id,
			description,
			responsible_id,
			location_id,
			status,
			cost,
			acquisition_date,
		});
		res.status(201).json(asset.toJSON());
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const deleteAsset = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		await asset.destroy();
		res.status(200).json({ message: "Asset deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};
