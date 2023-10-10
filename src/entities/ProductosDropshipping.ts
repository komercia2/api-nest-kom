import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Productos } from "./Productos"

@Index("productos_dropshipping_productos_id_foreign", ["productosId"], {})
@Entity("productos_dropshipping", { schema: "komercia_prod" })
export class ProductosDropshipping {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "comision" })
	comision: number

	@Column("int", { name: "productos_id", unsigned: true })
	productosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@ManyToOne(() => Productos, (productos) => productos.productosDropshippings, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "productos_id", referencedColumnName: "id" }])
	productos: Productos
}
