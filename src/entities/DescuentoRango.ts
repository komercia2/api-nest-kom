import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("descuento_rango_tiendas_id_foreign", ["tiendasId"], {})
@Entity("descuento_rango", { schema: "komercia_prod" })
export class DescuentoRango {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "nombre", nullable: true, length: 255 })
	nombre: string | null

	@Column("int", { name: "porcentaje_descuento", nullable: true })
	porcentajeDescuento: number | null

	@Column("int", { name: "valor_descuento", nullable: true })
	valorDescuento: number | null

	@Column("int", { name: "cantidad_productos", nullable: true })
	cantidadProductos: number | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("int", { name: "tipo", default: () => "'1'" })
	tipo: number

	@Column("longtext", { name: "rangos_precios", nullable: true })
	rangosPrecios: string | null

	@Column("int", { name: "opcion", default: () => "'1'" })
	opcion: number

	@Column("tinyint", { name: "estado", width: 1, default: () => "'0'" })
	estado: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.descuentoRangos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
