import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Bancos } from "./Bancos"
import { Tiendas } from "./Tiendas"

@Index("tienda_consignacion_info_tienda_id_foreign", ["tiendaId"], {})
@Index("tienda_consignacion_info_bancos_id_foreign", ["bancosId"], {})
@Entity("tienda_consignacion_info", { schema: "komercia_prod" })
export class TiendaConsignacionInfo {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "tipo" })
	tipo: number

	@Column("varchar", { name: "titular", length: 255 })
	titular: string

	@Column("varchar", { name: "numero_cuenta", length: 20 })
	numeroCuenta: string

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

	@Column("int", { name: "bancos_id", unsigned: true })
	bancosId: number

	@Column("varchar", { name: "tipo_identificacion", length: 255 })
	tipoIdentificacion: string

	@Column("varchar", { name: "identificacion", length: 255 })
	identificacion: string

	@Column("text", { name: "comentario", nullable: true })
	comentario: string | null

	@ManyToOne(() => Bancos, (bancos) => bancos.tiendaConsignacionInfos, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "bancos_id", referencedColumnName: "id" }])
	bancos: Bancos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaConsignacionInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
