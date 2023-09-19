import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("tiendas_usuarios_users_id_foreign", ["usersId"], {})
@Index("tiendas_usuarios_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tiendas_usuarios", { schema: "komercia_prod" })
export class TiendasUsuarios {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "rol" })
	rol: number

	@Column("int", { name: "users_id", unsigned: true })
	usersId: number

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendasUsuarios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@ManyToOne(() => Users, (users) => users.tiendasUsuarios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
	users: Users
}
