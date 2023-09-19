import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Productos } from "./Productos"
import { ProductosVariantesCombinaciones } from "./ProductosVariantesCombinaciones"

@Index("productos_variantes_id_producto_foreign", ["idProducto"], {})
@Entity("productos_variantes", { schema: "komercia_prod" })
export class ProductosVariantes {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("longtext", { name: "variantes", nullable: true })
	variantes: string | null

	@Column("int", { name: "id_producto", unsigned: true })
	idProducto: number

	@ManyToOne(() => Productos, (productos) => productos.productosVariantes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_producto", referencedColumnName: "id" }])
	idProducto2: Productos

	@OneToMany(
		() => ProductosVariantesCombinaciones,
		(productosVariantesCombinaciones) => productosVariantesCombinaciones.idProductosVariantes2
	)
	productosVariantesCombinaciones: ProductosVariantesCombinaciones[]
}
