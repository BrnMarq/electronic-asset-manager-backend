import express from "express";
import authenticationRouter from "@/router/authentication";

const router = express.Router();

export default () => {
	authenticationRouter(router);
	router.get("/", (req, res) => {
		res.status(200).send("OK");
	});

	return router;
};
