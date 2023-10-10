import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("password_resets_email_index", ["email"], {})
@Index("password_resets_token_index", ["token"], {})
@Entity("password_resets", { schema: "komercia_prod" })
export class PasswordResets {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "email", length: 255 })
	email: string

	@Column("varchar", { name: "token", length: 255 })
	token: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null
}
