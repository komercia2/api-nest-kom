import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm"

@Index("personal_access_tokens_token_unique", ["token"], { unique: true })
@Index(
	"personal_access_tokens_tokenable_type_tokenable_id_index",
	["tokenableType", "tokenableId"],
	{}
)
@Entity("personal_access_tokens", { schema: "komercia_prod" })
export class PersonalAccessTokens {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "tokenable_type", length: 255 })
	tokenableType: string

	@Column("bigint", { name: "tokenable_id", unsigned: true })
	tokenableId: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("varchar", { name: "token", unique: true, length: 64 })
	token: string

	@Column("text", { name: "abilities", nullable: true })
	abilities: string | null

	@Column("timestamp", { name: "last_used_at", nullable: true })
	lastUsedAt: Date | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
