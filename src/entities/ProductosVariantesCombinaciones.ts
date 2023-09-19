import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { ProductosVariantes } from "./ProductosVariantes"

@Index(
	"productos_variantes_combinaciones_id_productos_variantes_foreign",
	["idProductosVariantes"],
	{}
)
@Entity("productos_variantes_combinaciones", { schema: "komercia_prod" })
export class ProductosVariantesCombinaciones {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("longtext", { name: "combinaciones", nullable: true })
	combinaciones: string | null

	@Column("int", { name: "id_productos_variantes", unsigned: true })
	idProductosVariantes: number

	@ManyToOne(
		() => ProductosVariantes,
		(productosVariantes) => productosVariantes.productosVariantesCombinaciones,
		{ onDelete: "CASCADE", onUpdate: "NO ACTION" }
	)
	@JoinColumn([{ name: "id_productos_variantes", referencedColumnName: "id" }])
	idProductosVariantes2: ProductosVariantes
}
