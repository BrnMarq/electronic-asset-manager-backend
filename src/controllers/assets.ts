import express from "express";
import { validationResult } from "express-validator";
import Asset from "../models/Asset";
import { ChangeType } from "@/models/ChangeLog";

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
			created_by: 1,
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

		await asset.destroy({
			audit: { changed_by: 1, action: ChangeType.DELETE },
		} as any);
		res.status(200).json({ message: "Asset deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const relocateAsset = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { location_id, change_reason } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		const oldLocationId = asset.get("location_id") as number;

		if (oldLocationId === location_id) {
			return res
				.status(400)
				.json({ message: "The new location is the same as the previous one." });
		}

		asset.set("location_id", location_id);
		await asset.save({
			audit: {
				changed_by: 1,
				action: ChangeType.UPDATE_LOCATION,
				reason: change_reason,
			},
		} as any);

		res.status(200).json({
			message: "Asset relocated successfully",
			asset: asset.toJSON(),
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const updateAssetCost = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { cost, change_reason } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		const oldCost = asset.get("cost") as number;

		if (oldCost === cost) {
			return res
				.status(400)
				.json({ message: "The new cost is the same as the previous one." });
		}

		asset.set("cost", cost);
		await asset.save({
			audit: {
				changed_by: 1,
				action: ChangeType.UPDATE_COST,
				reason: change_reason,
			},
		} as any);

		res.status(200).json({
			message: "Asset cost updated successfully",
			asset: asset.toJSON(),
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};

export const updateAssetStatus = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { status, change_reason } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const asset = await Asset.findByPk(id);
		if (!asset) {
			return res.status(404).json({ message: "Asset not found" });
		}

		const oldStatus = asset.get("status") as string;

		if (oldStatus === status) {
			return res
				.status(400)
				.json({ message: "The new status is the same as the previous one." });
		}

		asset.set("status", status);
		await asset.save({
			audit: {
				changed_by: 1,
				action: ChangeType.UPDATE_STATUS,
				reason: change_reason,
			},
		} as any);

		res.status(200).json({
			message: "Asset status updated successfully",
			asset: asset.toJSON(),
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
		console.error(error);
	}
};
