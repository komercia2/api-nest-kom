import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("oauth_personal_access_clients_client_id_index", ["clientId"], {})
@Entity("oauth_personal_access_clients", { schema: "komercia_prod" })
export class OauthPersonalAccessClients {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "client_id" })
	clientId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
