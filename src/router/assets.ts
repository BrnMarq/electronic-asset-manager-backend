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
} from "../validators/assets";
import { authenticatedMiddleware } from "../middlewares/authentication";
import { roleMiddleware } from "@/middlewares/authorization";

export default (router: express.Router) => {
	router.get("/assets", authenticatedMiddleware, getAssetsValidator, getAssets);
	router.get(
		"/assets/:id",
		authenticatedMiddleware,
		roleMiddleware("admin"),
		getAssetsValidator,
		getAssetChangelog
	);
	router.get(
		"/assets/export",
		authenticatedMiddleware,
		roleMiddleware("admin", "manager"),
		getAssetsValidator,
		exportAssets
	);
	router.post(
		"/assets",
		authenticatedMiddleware,
		roleMiddleware("admin"),
		createAssetValidator,
		createAsset
	);
	router.delete(
		"/assets/:id",
		authenticatedMiddleware,
		roleMiddleware("admin"),
		deleteAssetValidator,
		deleteAsset
	);
	// This route manage permissions in the controller due to specific authorization control
	router.patch(
		"/assets/:id",
		authenticatedMiddleware,
		roleMiddleware("admin", "manager"),
		updateAssetValidator,
		updateAsset
	);
};
