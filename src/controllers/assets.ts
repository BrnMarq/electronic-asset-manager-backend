import express from "express";
import { validationResult } from "express-validator";
import Asset from "../models/Asset";
import ChangeLog from "@/models/ChangeLog";

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

export const relocateAsset = async (
  req: express.Request,
  res: express.Response
) => {
  try {
	const { id } = req.params;
	const { location_id, change_reason } = req.body;
	const user_id = (req as any).user?.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const oldLocationId = asset.get('location_id') as number;

    if (oldLocationId === location_id) {
      return res.status(400).json({ message: "The new location is the same as the previous one." });
    }

    asset.set('location_id', location_id);
    await asset.save();

    await ChangeLog.create(
	{
      asset_id: asset.get('id'),
      user_id: user_id,
      change_type: "RELOCATE",
      change_reason: change_reason,
      old_name: asset.get('name'),
      old_serial_number: asset.get('serial_number'),
      old_type_id: asset.get('type_id'),
      old_description: asset.get('description'),
      old_responsible_id: asset.get('responsible_id'),
      old_location_id: oldLocationId,
      old_cost: asset.get('cost'),
      old_status: asset.get('status'),
      old_acquisition_date: asset.get('acquisition_date')
    });

    res.status(200).json({
      message: "Asset relocated successfully",
      asset: asset.toJSON()
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
    const user_id = (req as any).user?.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const oldCost = asset.get('cost') as number;

    if (oldCost === cost) {
      return res.status(400).json({ message: "The new cost is the same as the previous one." });
    }

    asset.set('cost', cost);
    await asset.save();

    await ChangeLog.create({
      asset_id: asset.get('id'),
      user_id: user_id,
      change_type: "COST_UPDATE",
      change_reason: change_reason,
      old_name: asset.get('name'),
      old_serial_number: asset.get('serial_number'),
      old_type_id: asset.get('type_id'),
      old_description: asset.get('description'),
      old_responsible_id: asset.get('responsible_id'),
      old_location_id: asset.get('location_id'),
      old_cost: oldCost,
      old_status: asset.get('status'),
      old_acquisition_date: asset.get('acquisition_date')
    });

    res.status(200).json({
      message: "Asset cost updated successfully",
      asset: asset.toJSON()
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
    const user_id = (req as any).user?.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const oldStatus = asset.get('status') as string;

    if (oldStatus === status) {
      return res.status(400).json({ message: "The new status is the same as the previous one." });
    }

    const validStatuses = ["active", "inactive", "decommissioned"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Invalid status. Allowed values: active, inactive, decommissioned" 
      });
    }

    asset.set('status', status);
    await asset.save();

    await ChangeLog.create({
      asset_id: asset.get('id'),
      user_id: user_id,
      change_type: "STATUS_CHANGE",
      change_reason: change_reason,
      old_name: asset.get('name'),
      old_serial_number: asset.get('serial_number'),
      old_type_id: asset.get('type_id'),
      old_description: asset.get('description'),
      old_responsible_id: asset.get('responsible_id'),
      old_location_id: asset.get('location_id'),
      old_cost: asset.get('cost'),
      old_status: oldStatus,
      old_acquisition_date: asset.get('acquisition_date')
    });

    res.status(200).json({
      message: "Asset status updated successfully",
      asset: asset.toJSON()
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};