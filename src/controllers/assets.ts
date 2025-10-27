import { Response } from "express";
import { validationResult } from "express-validator";
import Asset from "../models/Asset";
import { ChangeType } from "../models/ChangeLog";
import Location from "@/models/Location";
import Type from "@/models/Type";
import User from "@/models/User";
import { AuthenticatedRequest } from "../middlewares/authentication";

export const getCreateAssetInfo = async (
	_: AuthenticatedRequest,
	res: Response
) => {
	try {
		const locations = await Location.findAll({
			attributes: {
				exclude: ["createdAt"],
			},
		});
		const types = await Type.findAll({
			attributes: ["id", "name", "category", "description"],
		});
		const users = await User.findAll({
			attributes: ["id", "username", "email", "first_name", "last_name"],
		});

		res.status(200).json({ locations, types, users });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createAsset = async (req: AuthenticatedRequest, res: Response) => {
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
		const { user_id } = req;

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
			created_by: user_id,
		});
		res.status(201).json(asset.toJSON());
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const deleteAsset = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;
		const { user_id } = req;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		await asset.destroy({
			audit: { changed_by: user_id, action: ChangeType.DELETE },
		} as any);
		res.status(200).json({ message: "Asset deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const updateAsset = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { id } = req.params;
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
			change_reason,
		} = req.body;
		const { user_id } = req;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		const newAssetData = {
			name,
			serial_number,
			type_id,
			description,
			responsible_id,
			location_id,
			status,
			cost,
			acquisition_date,
		};

		for (const key in newAssetData) {
			if (newAssetData[key as keyof typeof newAssetData] === undefined) {
				delete newAssetData[key as keyof typeof newAssetData];
			}
		}

		asset.set(newAssetData);

		if (!asset.changed()) {
			return res
				.status(400)
				.json({ message: "No changes were made to the asset." });
		}

		await asset.save({
			audit: {
				changed_by: user_id,
				action: ChangeType.UPDATE,
				reason: change_reason,
			},
		} as any);

		res
			.status(200)
			.json({ message: "Asset updated successfully", asset: asset.toJSON() });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};
