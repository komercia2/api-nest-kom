import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_payu_info_tienda_id_foreign", ["tiendaId"], {})
@Entity("tienda_payu_info", { schema: "komercia_prod" })
export class TiendaPayuInfo {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "merchantId", length: 255 })
	merchantId: string

	@Column("varchar", { name: "accountId", length: 255 })
	accountId: string

	@Column("tinyint", { name: "pruebas", width: 1 })
	pruebas: boolean

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@Column("varchar", { name: "apiLogin", length: 255 })
	apiLogin: string

	@Column("varchar", { name: "apiKey", length: 255 })
	apiKey: string

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaPayuInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
