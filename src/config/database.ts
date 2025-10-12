import { Sequelize } from "sequelize-typescript";
import config from "@/config";

const sequelize: Sequelize = new Sequelize(config.database.url, {
	dialect: "postgres",
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
	},
});

const testConnection: () => Promise<void> = async () => {
	try {
		await sequelize.authenticate();
		console.log(
			"Connection to the database has been established successfully."
		);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

testConnection();

export default sequelize;
