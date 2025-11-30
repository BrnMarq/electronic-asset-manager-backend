import express from "express";

import {
	getAssets,
	createAsset,
	deleteAsset,
	updateAsset,
	exportAssets,
	getAssetChangelog,
} from "../controllers/assets";
import {
	getAssetsValidator,
	createAssetValidator,
	deleteAssetValidator,
	updateAssetValidator,
	getAssetChangelogValidator,
} from "../validators/assets";
import { authenticatedMiddleware } from "../middlewares/authentication";

export default (router: express.Router) => {
	router.get("/assets", authenticatedMiddleware, getAssetsValidator, getAssets);
	router.get(
		"/assets/:id",
		authenticatedMiddleware,
		getAssetChangelogValidator,
		getAssetChangelog
	);
	router.get(
		"/assets/export",
		authenticatedMiddleware,
		getAssetsValidator,
		exportAssets
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
