import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Productos } from "./Productos"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("tienda_promociones_id_producto_foreign", ["idProducto"], {})
@Index("tienda_promociones_id_tienda_foreign", ["idTienda"], {})
@Index("tienda_promociones_user_id_foreign", ["userId"], {})
@Entity("tienda_promociones", { schema: "komercia_prod" })
export class TiendaPromociones {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "valor_promocion" })
	valorPromocion: number

	@Column("date", { name: "fecha_inicio" })
	fechaInicio: string

	@Column("date", { name: "fecha_final" })
	fechaFinal: string

	@Column("text", { name: "comentarios", nullable: true })
	comentarios: string | null

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@Column("int", { name: "id_producto", unsigned: true })
	idProducto: number

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("int", { name: "user_id", unsigned: true })
	userId: number

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@ManyToOne(() => Productos, (productos) => productos.tiendaPromociones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_producto", referencedColumnName: "id" }])
	idProducto2: Productos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaPromociones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas

	@ManyToOne(() => Users, (users) => users.tiendaPromociones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
