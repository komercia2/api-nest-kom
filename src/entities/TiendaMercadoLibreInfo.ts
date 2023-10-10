import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tienda_mercado_libre_info", { schema: "komercia_prod" })
export class TiendaMercadoLibreInfo {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "access_token", length: 255 })
	accessToken: string

	@Column("varchar", { name: "refresh_token", length: 255 })
	refreshToken: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
