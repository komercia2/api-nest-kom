import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Users } from "./Users"

@Index("user_admins_user_id_foreign", ["userId"], {})
@Entity("user_admins", { schema: "komercia_prod" })
export class UserAdmins {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "user_id", unsigned: true })
	userId: number

	@Column("varchar", { name: "role", length: 255 })
	role: string

	@Column("tinyint", { name: "status", width: 1, default: () => "'1'" })
	status: boolean

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Users, (users) => users.userAdmins, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
	user: Users
}
