import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
	Default,
} from "sequelize-typescript";

@Table({
	tableName: "location",
	modelName: "Location",
	timestamps: false,
})
export class Location extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	description?: string;

	@Default(DataType.NOW)
	@Column(DataType.DATE)
	created_at!: Date;
}

export default Location;
