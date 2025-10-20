import express from "express";

import { createAsset, deleteAsset } from "../controllers/assets";
import {
	createAssetValidator,
	deleteAssetValidator,
} from "../validators/assets";

export default (router: express.Router) => {
	router.get("/assets", (req, res) => {
		res.status(200).send("OK");
	});
	router.post("/assets", createAssetValidator, createAsset);
	router.delete("/assets/:id", deleteAssetValidator, deleteAsset);
};
