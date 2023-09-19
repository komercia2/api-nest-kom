import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"
import { Users } from "./Users"

@Index("mensaje_orden_carrito_id_foreign", ["carritoId"], {})
@Index("mensaje_orden_user_id_foreign", ["userId"], {})
@Entity("mensaje_orden", { schema: "komercia_prod" })
export class MensajeOrden {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("text", { name: "mensaje" })
	mensaje: string

	@Column("varchar", { name: "rol", length: 255 })
	rol: string

	@Column("int", { name: "carrito_id", unsigned: true })
	carritoId: number

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

	@ManyToOne(() => Carritos, (carritos) => carritos.mensajeOrdens, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carrito_id", referencedColumnName: "id" }])
	carrito: Carritos

	@ManyToOne(() => Users, (users) => users.mensajeOrdens, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
