import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class ChangeLog extends Model {}

ChangeLog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		asset_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		changed_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		change_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		change_reason: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		old_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		old_serial_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		old_responsible_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_location_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		old_cost: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		old_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		old_acquisition_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "ChangeLog",
		tableName: "change_log",
		timestamps: false,
	}
);

export default ChangeLog;
