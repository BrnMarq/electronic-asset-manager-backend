import express from "express";
import authenticationRouter from "@/router/authentication";

const router = express.Router();

export default () => {
	authenticationRouter(router);

	return router;
};
