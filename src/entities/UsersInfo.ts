import { Column, Entity, JoinColumn, OneToOne } from "typeorm"

import { Users } from "./Users"

@Entity("users_info", { schema: "komercia_prod" })
export class UsersInfo {
	@Column("int", { primary: true, name: "id_user", unsigned: true })
	idUser: number

	@Column("date", { name: "birthday", nullable: true })
	birthday: string | null

	@Column("varchar", { name: "direccion", nullable: true, length: 60 })
	direccion: string | null

	@Column("varchar", { name: "barrio", nullable: true, length: 45 })
	barrio: string | null

	@Column("tinyint", {
		name: "genero",
		nullable: true,
		width: 1,
		default: () => "'1'"
	})
	genero: boolean | null

	@Column("varchar", { name: "apellido", nullable: true, length: 50 })
	apellido: string | null

	@Column("varchar", { name: "telefono", nullable: true, length: 255 })
	telefono: string | null

	@Column("int", { name: "visitas", nullable: true, default: () => "'1'" })
	visitas: number | null

	@Column("int", { name: "reputacion", nullable: true, default: () => "'1'" })
	reputacion: number | null

	@OneToOne(() => Users, (users) => users.usersInfo, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
	idUser2: Users
}
