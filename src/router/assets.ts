import express from "express";

import {
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
	router.get("/assets", (_, res) => {
		res.status(200).send("OK");
	});

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
