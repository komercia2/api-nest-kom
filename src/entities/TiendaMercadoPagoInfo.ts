import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_mercado_pago_info_id_tienda_foreign", ["idTienda"], {})
@Entity("tienda_mercado_pago_info", { schema: "komercia_prod" })
export class TiendaMercadoPagoInfo {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "public_key", length: 255 })
	publicKey: string

	@Column("varchar", { name: "access_token", length: 255 })
	accessToken: string

	@Column("varchar", { name: "refresh_token", length: 255 })
	refreshToken: string

	@Column("varchar", { name: "collector_id", nullable: true, length: 255 })
	collectorId: string | null

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaMercadoPagoInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
