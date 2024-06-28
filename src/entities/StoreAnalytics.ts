import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { CategoriaProductos } from "./CategoriaProductos"
import { Productos } from "./Productos"
import { Tiendas } from "./Tiendas"

@Entity("store_analytics")
@Index("id_UNIQUE", ["id"], { unique: true })
@Index("store_analytics_fk_idx", ["storeId"])
@Index("product_analyrics_fk_idx", ["productId"])
@Index("product_category_fk_idx", ["categoryId"])
export class StoreAnalytics {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "int", unsigned: true })
	storeId: number

	@Column({ type: "varchar", length: 45 })
	event: string

	@Column({ type: "int", unsigned: true, nullable: true })
	productId: number | null

	@Column({ type: "int", unsigned: true, nullable: true })
	categoryId: number | null

	@Column({ type: "varchar", length: 45, nullable: true })
	device: string

	@Column({ type: "datetime", nullable: false })
	occurredAt: Date

	@Column({ type: "int", unsigned: true, nullable: true })
	units: number | null

	@ManyToOne(() => Tiendas, (Tiendas) => Tiendas.analytics, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "storeId" })
	Tiendas: Tiendas

	@ManyToOne(() => Productos, (Productos) => Productos.analytics, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "productId" })
	Productos: Productos

	@ManyToOne(() => CategoriaProductos, (categoria) => categoria.analytics, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "categoryId" })
	categoriaProductos: CategoriaProductos
}
