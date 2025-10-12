import { Model, DataTypes } from "sequelize";
import sequelize from "@/config/database";

class Role extends Model {}

Role.init(
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
		permissions: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "Role",
		tableName: "roles",
		timestamps: false,
	}
);

export default Role;
