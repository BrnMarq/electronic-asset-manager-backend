import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
	ForeignKey,
	BelongsTo,
	BeforeUpdate,
	BeforeDestroy,
} from "sequelize-typescript";
import { Type } from "../models/Type";
import { User } from "../models/User";
import { Location } from "../models/Location";
import { ChangeLog, ChangeType } from "./ChangeLog";

const logChanges = async (action: ChangeType, asset: Asset) => {
	const instance = asset.toJSON();
	await ChangeLog.create({
		asset_id: instance.id,
		user_id: instance.created_by,
		change_type: action,
		old_name: instance.name,
		old_serial_number: instance.serial_number,
		old_type_id: instance.type_id,
		old_description: instance.description,
		old_responsible_id: instance.responsible_id,
		old_location_id: instance.location_id,
		old_cost: instance.cost,
		old_status: instance.status,
		old_acquisition_date: instance.acquisition_date,
	});
};

@Table({
	tableName: "asset",
	modelName: "Asset",
	timestamps: true,
	updatedAt: false,
	paranoid: true,
})
export class Asset extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	serial_number!: number;

	@AllowNull(false)
	@ForeignKey(() => Type)
	@Column(DataType.INTEGER)
	type_id!: number;

	@BelongsTo(() => Type)
	type!: Type;

	@AllowNull(true)
	@Column(DataType.STRING)
	description?: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	responsible_id!: number;

	@BelongsTo(() => User, 'responsible_id')
	responsible!: User;

	@AllowNull(false)
	@ForeignKey(() => Location)
	@Column(DataType.INTEGER)
	location_id!: number;

	@BelongsTo(() => Location)
	location!: Location;

	@AllowNull(false)
	@Column(DataType.STRING)
	status!: string;

	@AllowNull(false)
	@Column(DataType.DOUBLE)
	cost!: number;

	@AllowNull(false)
	@Column(DataType.DATE)
	acquisition_date!: Date;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	created_by!: number;

	@BelongsTo(() => User, 'created_by')
	creator!: User;

	@BeforeUpdate
	static async logUpdate(instance: Asset) {
		await logChanges(ChangeType.UPDATE, instance);
	}

	@BeforeDestroy
	static async logDelete(instance: Asset) {
		await logChanges(ChangeType.DELETE, instance);
	}
}

export default Asset;
