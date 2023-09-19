import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"

import { Carritos } from "./Carritos"
import { Productos } from "./Productos"

@Index("productos_carritos_carrito_foreign", ["carrito"], {})
@Index("productos_carritos_producto_foreign", ["producto"], {})
@Entity("productos_carritos", { schema: "komercia_prod" })
export class ProductosCarritos {
	@Column("int", { name: "carrito", unsigned: true, primary: true })
	carrito: number

	@Column("int", { name: "producto", unsigned: true, primary: true })
	producto: number

	@Column("int", { name: "unidades" })
	unidades: number

	@Column("double", { name: "precio_producto", precision: 14, scale: 2 })
	precioProducto: number

	@Column("varchar", { name: "variantes", nullable: true, length: 255 })
	variantes: string | null

	@ManyToOne(() => Carritos, (carritos) => carritos.productosCarritos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carrito", referencedColumnName: "id" }])
	carrito2: Carritos

	@ManyToOne(() => Productos, (productos) => productos.productosCarritos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "producto", referencedColumnName: "id" }])
	producto2: Productos
}
