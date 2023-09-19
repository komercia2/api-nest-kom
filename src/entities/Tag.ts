import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { TagProperty } from "./TagProperty"
import { Tiendas } from "./Tiendas"

@Index("tag_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tag", { schema: "komercia_prod" })
export class Tag {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("tinyint", { name: "status", width: 1 })
	status: boolean

	@Column("int", { name: "order", nullable: true })
	order: number | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "edit", width: 1, default: () => "'0'" })
	edit: boolean

	@Column("tinyint", { name: "visible", width: 1, default: () => "'1'" })
	visible: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tags, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(() => TagProperty, (tagProperty) => tagProperty.tag)
	tagProperties: TagProperty[]
}
