import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Type extends Model {}

Type.init(
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
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		parent_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Type.tableName,
				key: "id",
			},
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: "Type",
		tableName: "type",
		timestamps: false,
	}
);

export default Type;
