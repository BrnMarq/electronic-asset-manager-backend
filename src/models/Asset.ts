import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Type from "../models/Type";
import User from "../models/User";
import Location from "../models/location";

class Asset extends Model {}

Asset.init(
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
        serial_number: {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Type.tableName,
                key: "id",
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        responsible_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User.tableName,
                key: "id",
            },
        },
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Location.tableName,
                key: "id",
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        acquisition_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
        updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: User.tableName,
                key: "id",
            },
        },
        updated_by: {
            type: DataTypes.INTEGER,
            references: {
                model: User.tableName,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Asset",
        tableName: "asset",
        timestamps: false,
    }
);

export default Asset;