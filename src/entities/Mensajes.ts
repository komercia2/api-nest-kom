import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("mensajes_user_foreign", ["user"], {})
@Index("mensajes_tienda_foreign", ["tienda"], {})
@Entity("mensajes", { schema: "komercia_prod" })
export class Mensajes {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "ticket" })
	ticket: number

	@Column("int", { name: "user", unsigned: true })
	user: number

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "email", length: 80 })
	email: string

	@Column("varchar", { name: "telefono", length: 20 })
	telefono: string

	@Column("varchar", { name: "asunto", length: 255 })
	asunto: string

	@Column("text", { name: "mensaje" })
	mensaje: string

	@Column("tinyint", { name: "estado", width: 1, default: () => "'0'" })
	estado: boolean

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

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.mensajes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas

	@ManyToOne(() => Users, (users) => users.mensajes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user", referencedColumnName: "id" }])
	user2: Users
}
