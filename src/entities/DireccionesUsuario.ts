import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Ciudades } from "./Ciudades"
import { Users } from "./Users"

@Index("direcciones_usuario_user_id_foreign", ["userId"], {})
@Index("direcciones_usuario_ciudad_id_foreign", ["ciudadId"], {})
@Entity("direcciones_usuario", { schema: "komercia_prod" })
export class DireccionesUsuario {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "direccion", length: 255 })
	direccion: string

	@Column("varchar", { name: "tag", length: 255 })
	tag: string

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

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "apellido", length: 255 })
	apellido: string

	@Column("varchar", { name: "celular", length: 255 })
	celular: string

	@Column("varchar", { name: "barrio", length: 255 })
	barrio: string

	@Column("int", { name: "ciudad_id", unsigned: true })
	ciudadId: number

	@ManyToOne(() => Ciudades, (ciudades) => ciudades.direccionesUsuarios, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "ciudad_id", referencedColumnName: "id" }])
	ciudad: Ciudades

	@ManyToOne(() => Users, (users) => users.direccionesUsuarios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
