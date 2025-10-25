import pg from "pg";
import { Sequelize } from "sequelize-typescript";
import config from ".";
import path from "path";

const sequelize: Sequelize = new Sequelize(config.database.url, {
	dialect: "postgres",
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
	},
	dialectModule: pg,
	models: [path.join(__dirname, "../models/**/*.ts")],
});

const authenticate: () => Promise<void> = async () => {
	try {
		await sequelize.authenticate();
		console.log(
			"Connection to the database has been established successfully."
		);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

authenticate();

export default sequelize;
