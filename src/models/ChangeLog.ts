import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
} from "sequelize-typescript";

export enum ChangeType {
	UPDATE = "update",
	DELETE = "delete",
}

@Table({
	tableName: "change_log",
	modelName: "ChangeLog",
	timestamps: true,
	updatedAt: false,
})
export class ChangeLog extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	asset_id!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	user_id!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM,
		values: Object.values(ChangeType),
	})
	change_type!: ChangeType;

	@AllowNull(true)
	@Column(DataType.STRING)
	change_reason?: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	old_name!: string;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	old_serial_number!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	old_type_id!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	old_description!: string;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	old_responsible_id!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER)
	old_location_id!: number;

	@AllowNull(false)
	@Column(DataType.DOUBLE)
	old_cost!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	old_status!: string;

	@AllowNull(false)
	@Column(DataType.DATE)
	old_acquisition_date!: Date;
}

export default ChangeLog;
