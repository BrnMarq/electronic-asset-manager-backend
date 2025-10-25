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
	Default,
} from "sequelize-typescript";

@Table({
	tableName: "type",
	modelName: "Type",
	timestamps: false,
})
export class Type extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER)
	id!: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	category!: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	description?: string;

	@ForeignKey(() => Type)
	@Column(DataType.INTEGER)
	parent_id?: number;

	@BelongsTo(() => Type)
	parent?: Type;

	@Default(DataType.NOW)
	@Column(DataType.DATE)
	created_at!: Date;
}

export default Type;
