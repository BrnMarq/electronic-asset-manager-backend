import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Role from "../models/Role";

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hashed_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Role.tableName,
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
		modelName: "User",
		tableName: "users",
		timestamps: false,
	}
);

export default User;
