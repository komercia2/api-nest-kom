import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("trespi_credentials", { schema: "komercia_prod" })
export class TrespiCredentials {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "shop_id", length: 255 })
	shopId: string

	@Column("longtext", { name: "shopify_token" })
	shopifyToken: string

	@Column("longtext", { name: "komercia_token" })
	komerciaToken: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
