import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("invites_admin", { schema: "komercia_prod" })
export class InvitesAdmin {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "token", length: 255 })
	token: string

	@Column("varchar", { name: "email", length: 255 })
	email: string

	@Column("int", { name: "store" })
	store: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
