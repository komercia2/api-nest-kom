import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_epayco_info_id_tienda_foreign", ["idTienda"], {})
@Entity("tienda_epayco_info", { schema: "komercia_prod" })
export class TiendaEpaycoInfo {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "p_key", length: 255 })
	pKey: string

	@Column("varchar", { name: "p_cust_id_cliente", length: 255 })
	pCustIdCliente: string

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

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

	@Column("tinyint", { name: "pruebas", width: 1 })
	pruebas: boolean

	@Column("varchar", { name: "public_key", nullable: true, length: 255 })
	publicKey: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaEpaycoInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
