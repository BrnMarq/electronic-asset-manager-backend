import express from "express";

import {
	createAsset,
	deleteAsset,
	relocateAsset,
	updateAssetCost,
	updateAssetStatus,
} from "../controllers/assets";
import {
	createAssetValidator,
	deleteAssetValidator,
	relocateAssetValidator,
	updateCostValidator,
	updateStatusValidator,
} from "../validators/assets";
import { authenticatedMiddleware } from "../middlewares/authentication";

export default (router: express.Router) => {
	router.get("/assets", (req, res) => {
		res.status(200).send("OK");
	});

	router.post(
		"/assets",
		authenticatedMiddleware,
		createAssetValidator,
		createAsset
	);
	router.delete(
		"/assets/:id",
		authenticatedMiddleware,
		deleteAssetValidator,
		deleteAsset
	);

	router.patch(
		"/assets/:id/relocate",
		authenticatedMiddleware,
		relocateAssetValidator,
		relocateAsset
	);
	router.patch(
		"/assets/:id/cost",
		authenticatedMiddleware,
		updateCostValidator,
		updateAssetCost
	);
	router.patch(
		"/assets/:id/status",
		authenticatedMiddleware,
		updateStatusValidator,
		updateAssetStatus
	);
};
