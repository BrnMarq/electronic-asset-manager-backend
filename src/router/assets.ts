import express from "express";

import {
	getAssets,
	createAsset,
	deleteAsset,
	updateAsset,
	getCreateAssetInfo,
} from "../controllers/assets";
import {
	createAssetValidator,
	deleteAssetValidator,
	updateAssetValidator,
} from "../validators/assets";
import { authenticatedMiddleware } from "../middlewares/authentication";

export default (router: express.Router) => {
	router.get("/assets", getAssets);
	router.get(
		"/assets/create-info",
		authenticatedMiddleware,
		getCreateAssetInfo
	);
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
		"/assets/:id",
		authenticatedMiddleware,
		updateAssetValidator,
		updateAsset
	);
};
