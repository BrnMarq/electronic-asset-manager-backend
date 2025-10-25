import express from "express";

import { createAsset, deleteAsset, relocateAsset, updateAssetCost, updateAssetStatus } from "../controllers/assets";
import {
	createAssetValidator,
	deleteAssetValidator,
	relocateAssetValidator,
	updateCostValidator,
	updateStatusValidator
} from "../validators/assets";

export default (router: express.Router) => {
	router.get("/assets", (req, res) => {
		res.status(200).send("OK");
	});
	router.post("/assets", createAssetValidator, createAsset);
	router.delete("/assets/:id", deleteAssetValidator, deleteAsset);

	router.patch("/assets/:id/relocate", relocateAssetValidator, relocateAsset);
	router.patch("/assets/:id/cost", updateCostValidator, updateAssetCost);
	router.patch("/assets/:id/status", updateStatusValidator, updateAssetStatus);

};
