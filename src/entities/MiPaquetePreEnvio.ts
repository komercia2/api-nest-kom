import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("mi_paquete_pre_envio_carritos_id_foreign", ["carritosId"], {})
@Entity("mi_paquete_pre_envio", { schema: "komercia_prod" })
export class MiPaquetePreEnvio {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "sender", length: 255 })
	sender: string

	@Column("varchar", { name: "receiver", length: 255 })
	receiver: string

	@Column("varchar", { name: "locate", length: 255 })
	locate: string

	@Column("varchar", { name: "product_information", length: 255 })
	productInformation: string

	@Column("varchar", { name: "delivery_company", length: 255 })
	deliveryCompany: string

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null

	@Column("varchar", { name: "comments", nullable: true, length: 255 })
	comments: string | null

	@Column("int", { name: "carritos_id", unsigned: true })
	carritosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.miPaquetePreEnvios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos
}
