import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Productos } from "./Productos"
import { TagProperty } from "./TagProperty"

@Index("tag_product_tag_property_id_foreign", ["tagPropertyId"], {})
@Index("tag_product_productos_id_foreign", ["productosId"], {})
@Entity("tag_product", { schema: "komercia_prod" })
export class TagProduct {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("bigint", { name: "tag_property_id", unsigned: true })
	tagPropertyId: string

	@Column("int", { name: "productos_id", unsigned: true })
	productosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Productos, (productos) => productos.tagProducts, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "productos_id", referencedColumnName: "id" }])
	productos: Productos

	@ManyToOne(() => TagProperty, (tagProperty) => tagProperty.tagProducts, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tag_property_id", referencedColumnName: "id" }])
	tagProperty: TagProperty
}
