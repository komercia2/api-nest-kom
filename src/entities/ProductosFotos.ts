import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Productos } from "./Productos"

@Index("productos_fotos_id_producto_foreign", ["idProducto"], {})
@Entity("productos_fotos", { schema: "komercia_prod" })
export class ProductosFotos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "id_producto", unsigned: true })
	idProducto: number

	@Column("varchar", { name: "foto", length: 255 })
	foto: string

	@Column("varchar", { name: "id_cloudinary", nullable: true, length: 255 })
	idCloudinary: string | null

	@Column("varchar", { name: "foto_cloudinary", nullable: true, length: 255 })
	fotoCloudinary: string | null

	@ManyToOne(() => Productos, (productos) => productos.productosFotos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_producto", referencedColumnName: "id" }])
	idProducto2: Productos
}
