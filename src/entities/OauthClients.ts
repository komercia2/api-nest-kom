import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("oauth_clients_user_id_index", ["userId"], {})
@Entity("oauth_clients", { schema: "komercia_prod" })
export class OauthClients {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "user_id", nullable: true })
	userId: number | null

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("varchar", { name: "secret", length: 100 })
	secret: string

	@Column("text", { name: "redirect" })
	redirect: string

	@Column("tinyint", { name: "personal_access_client", width: 1 })
	personalAccessClient: boolean

	@Column("tinyint", { name: "password_client", width: 1 })
	passwordClient: boolean

	@Column("tinyint", { name: "revoked", width: 1 })
	revoked: boolean

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
