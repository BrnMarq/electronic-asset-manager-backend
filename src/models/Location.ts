import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Location extends Model {}

Location.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: "Location",
		tableName: "location",
		timestamps: false,
	}
);

export default Location;
