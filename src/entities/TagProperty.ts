import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Tag } from "./Tag"
import { TagProduct } from "./TagProduct"

@Index("tag_property_tag_id_foreign", ["tagId"], {})
@Entity("tag_property", { schema: "komercia_prod" })
export class TagProperty {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("tinyint", { name: "status", width: 1 })
	status: boolean

	@Column("int", { name: "order" })
	order: number

	@Column("bigint", { name: "tag_id", unsigned: true })
	tagId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "edit", width: 1, default: () => "'0'" })
	edit: boolean

	@OneToMany(() => TagProduct, (tagProduct) => tagProduct.tagProperty)
	tagProducts: TagProduct[]

	@ManyToOne(() => Tag, (tag) => tag.tagProperties, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
	tag: Tag
}
