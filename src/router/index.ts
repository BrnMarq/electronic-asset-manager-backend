import express from "express";
import authenticationRouter from "./authentication";
import assetRouter from "./assets";

const router = express.Router();

export default () => {
	authenticationRouter(router);
	assetRouter(router);
	router.get("/", (req, res) => {
		res.status(200).send("OK");
	});

	return router;
};
