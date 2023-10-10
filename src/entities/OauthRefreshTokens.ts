import { Column, Entity, Index } from "typeorm"

@Index("oauth_refresh_tokens_access_token_id_index", ["accessTokenId"], {})
@Entity("oauth_refresh_tokens", { schema: "komercia_prod" })
export class OauthRefreshTokens {
	@Column("varchar", { primary: true, name: "id", length: 100 })
	id: string

	@Column("varchar", { name: "access_token_id", length: 100 })
	accessTokenId: string

	@Column("tinyint", { name: "revoked", width: 1 })
	revoked: boolean

	@Column("datetime", { name: "expires_at", nullable: true })
	expiresAt: Date | null
}
