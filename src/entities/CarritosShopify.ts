import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("carritos_shopify_carritos_id_foreign", ["carritosId"], {})
@Entity("carritos_shopify", { schema: "komercia_prod" })
export class CarritosShopify {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("longtext", { name: "productos" })
	productos: string

	@Column("int", { name: "carritos_id", unsigned: true })
	carritosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.carritosShopifies, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos
}
